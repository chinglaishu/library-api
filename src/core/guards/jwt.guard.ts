import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';
import { PUBLIC_API_METADATA_KEY } from '../constants/constants';
import JwtStrategy from '../jwt/jwt.strategy';

@Injectable()
export class JwtAuthGuard implements CanActivate  {
  constructor(private reflector: Reflector,
        private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_API_METADATA_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const token = JwtStrategy.getTokenFromReq(req);
    const userId = JwtStrategy.getUserIdFromToken(token);

    const user = await this.userService.findOne(userId);

    if (user) {
      req.user = user;
      return true;
    }

    return false;
  }
}