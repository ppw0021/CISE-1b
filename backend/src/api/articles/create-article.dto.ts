import { IsString, IsOptional, IsDate, IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  isbn: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  published_date?: Date; // Use JavaScript Date type

  @IsString()
  @IsOptional()
  publisher?: string;

  @IsDate()
  updated_date: Date; // Use JavaScript Date type
}
