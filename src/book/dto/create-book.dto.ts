import { IsEnum, IsOptional, IsString } from "class-validator";
import { BOOK_CATEGORY } from "../constant/constant";

export class CreateBookDto {
  @IsString()
  title: string;
  @IsOptional()
  subTitle: string;
  @IsString()
  author: string;
  @IsEnum(BOOK_CATEGORY)
  category: BOOK_CATEGORY;
  @IsString()
  publisherId: string;
}
