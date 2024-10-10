export type Article = {
    _id?: string;
    title?: string;
    authors?: string[]; // Changed to array
    publisher?: string; // Match CreateArticleDto
    year?: number;
    volume?: number | null; // Match CreateArticleDto
    number?: number | null; // Match CreateArticleDto
    pages?: number; // Match CreateArticleDto
    doi?: string;
};

export const DefaultEmptyArticle: Article = {
    _id: undefined,
    title: '',
    authors: [], // Initialize as an empty array
    publisher: '', // Renamed from journalName to match DTO
    year: 2024,
    volume: null, // Set to null by default
    number: null, // Set to null by default
    pages: 0, // Set to 0 by default
    doi: '',
};
