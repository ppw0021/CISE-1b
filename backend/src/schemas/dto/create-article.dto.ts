export class CreateArticleDto {
    readonly title: string;
    readonly authors: string[];
    readonly publisher: string; // Journal name
    readonly year_of_publication: number;
    readonly volume?: number | null;
    readonly number?: number | null;
    readonly pages: number;
    readonly doi: string;
}
