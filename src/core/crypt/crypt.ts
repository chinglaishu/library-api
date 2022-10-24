import { HttpException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { PASSWORD_SALT_ROUND } from "../config/config";

const crypt = {
  async hashPassword(password: string) {
    return await bcrypt.hash(password, PASSWORD_SALT_ROUND);
  },
  async comparePasswordAndHash(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  },
};

export default crypt;