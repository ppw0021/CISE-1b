export declare class CreateArticleDto {
    title: string;
    authors: string;
    publisher: string;
    year_of_publication?: number;
    volume?: string | null;
    number?: string | null;
    pages?: string;
    doi?: string;
    updated_date: Date;
}
