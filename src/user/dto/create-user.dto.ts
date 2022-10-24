import { IsString } from 'class-validator';

export class UserDto {
  id: string;
  username: string;
  password: string;
  displayName: string;
  createdAt: Date;
  updatedAt: Date;
}

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  displayName: string;
};

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class CreateUserDto {}
