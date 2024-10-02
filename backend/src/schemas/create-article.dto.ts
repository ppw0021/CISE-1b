// import { IsNotEmpty, IsString, IsArray, IsNumber } from 'class-validator';

// export class CreateArticleDto {
//   @IsNotEmpty()
//   @IsString()
//   title: string;

//   @IsNotEmpty()
//   @IsArray() // Change to IsArray to match the schema
//   @IsString({ each: true }) // Validate each element in the array is a string
//   authors: string[];

//   @IsNotEmpty()
//   @IsString()
//   publisher: string;

//   @IsNotEmpty()
//   @IsNumber() // Ensure this is a number
//   year_of_publication: number;

//   @IsNotEmpty()
//   @IsString() // Add SE practice field validation
//   sePractice: string;

//   @IsNotEmpty()
//   @IsString() // Add claim field validation
//   claim: string;
// }
