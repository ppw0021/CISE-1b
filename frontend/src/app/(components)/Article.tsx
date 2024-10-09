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
    description?: string; // Kept description for additional details
    published_date?: Date; // Kept for backward compatibility if needed
    publisher?: string;
    updated_date?: Date;
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
    description: '',
    published_date: undefined,
    publisher: '',
    updated_date: undefined,
};
