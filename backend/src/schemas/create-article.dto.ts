import { IsNotEmpty, IsString, IsArray, IsNumber } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsArray() // Change to IsArray to match the schema
  authors: string[]; // Change to string[] to match the schema

  @IsNotEmpty()
  @IsString()
  publisher: string;

  @IsNotEmpty()
  @IsNumber() // Use IsNumber from class-validator
  year_of_publication: number; // Ensure this is a number

  @IsNotEmpty()
  @IsString()
  doi: string;

  @IsNotEmpty()
  @IsString()
  pages: string; // Ensure this field is included
}
