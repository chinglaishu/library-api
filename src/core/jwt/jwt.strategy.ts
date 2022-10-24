import * as jwt from "jsonwebtoken";
import { HttpException } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { AUTHORIZATION_HEADER } from "../constants/headers";
import { JWT_SECRET } from "../config/config";
import { DecodeTokenObj } from "../types/common";

const JwtStrategy = {
  sign(userId: any, expireTime: string): string {
    return jwt.sign({userId}, JWT_SECRET, {expiresIn: expireTime});
  },
  signByUser(user: User, expireTime: string): string {
    const {id} = user;
    return this.sign(id, expireTime);
  },
  verify(token: string) {
    try {
      return (jwt.verify(token, JWT_SECRET) as DecodeTokenObj);
    } catch (err) {
      return false;
    }
  },
  getUserIdFromToken(token: string) {
    const decodeTokenObj = JwtStrategy.verify(token);
    if (!decodeTokenObj) {
      throw new HttpException("not valid token", 500);
    }
    const {userId} = decodeTokenObj;
    return userId;

  },
  getTokenFromReq(req: Request) {
    const {headers} = req;
    const token = headers[AUTHORIZATION_HEADER];
    return token;
  },
};

export default JwtStrategy;