export type Article = {
    _id?: string;
    title?: string;
    authors?: string; // Changed from 'author' to 'authors'
    journalName?: string; // Added journalName
    year?: number;
    volume?: string; // Added volume
    number?: string; // Added number
    pages?: string; // Added pages
    doi?: string; // Added DOI
};

export const DefaultEmptyArticle: Article = {
    _id: undefined,
    title: '',
    authors: '', // Changed from '' to ''
    journalName: '', // Initialized journalName
    year: 2024,
    volume: '', // Initialized volume
    number: '', // Initialized number
    pages: '', // Initialized pages
    doi: '', // Initialized DOI
};
