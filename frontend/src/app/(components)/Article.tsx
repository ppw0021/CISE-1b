export type Article = {
    _id?: string;
    title?: string;
    authors?: string[]; // Changed to array
    publisher?: string; // Match CreateArticleDto
    year_of_publication?: number; // Change to match DTO and schema
    volume?: number | null;
    number?: number | null;
    pages?: number;
    doi?: string;
};

export const DefaultEmptyArticle: Article = {
    _id: undefined,
    title: '',
    authors: [], // Initialize as an empty array
    publisher: '', // Renamed from journalName to match DTO
    year_of_publication: 2024, // Update field name
    volume: null, // Set to null by default
    number: null, // Set to null by default
    pages: 0, // Set to 0 by default
    doi: '',
};
