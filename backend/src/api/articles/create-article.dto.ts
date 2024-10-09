import { IsString, IsOptional, IsDate, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    authors: string; // Changed from author to authors

    @IsString()
    @IsNotEmpty()
    publisher: string;

    @IsNumber()
    @IsOptional() // Year of publication can be optional
    year_of_publication?: number;

    @IsString()
    @IsOptional()
    volume?: string | null; // Volume can be null

    @IsString()
    @IsOptional()
    number?: string | null; // Number can be null

    @IsString()
    @IsOptional()
    pages?: string; // Pages as an optional string

    @IsString()
    @IsOptional()
    doi?: string; // DOI as an optional string

    @IsDate()
    updated_date: Date; // Use JavaScript Date type

    @IsOptional()
    @IsBoolean()
    moderated?: boolean;  // Moderated status is optional and defaults to false
}
