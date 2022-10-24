import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto, RegisterDto, UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/core/decorators/role.decorator';
import { ROLE } from 'src/core/constants/constants';
import crypt from 'src/core/crypt/crypt';
import JwtStrategy from 'src/core/jwt/jwt.strategy';
import { ACCESS_TOKEN_EXPIRE_TIME } from 'src/core/config/config';
import { Public } from 'src/core/decorators/public.decorator';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({
    description: 'User registered',
    type: UserDto,
  })
  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const {password, username, displayName} = registerDto;
    const hashPassword = await crypt.hashPassword(password)
    const createUserDto: CreateUserDto = {
      username,
      password: hashPassword,
      displayName,
    };
    return this.userService.create(createUserDto);
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const {username, password} = loginDto;
    const user = await this.userService.findOneWithFilter({username});
    await crypt.comparePasswordAndHash(password, user.password);
    const token = JwtStrategy.signByUser(user, ACCESS_TOKEN_EXPIRE_TIME);
    return {user, token};
  }

  @Roles(ROLE.ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOkResponse({
    description: 'Successfully get User by id',
    type: UserDto,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Roles(ROLE.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
