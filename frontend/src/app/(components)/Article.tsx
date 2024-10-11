export type Article = {
    _id?: string;
    title?: string;
    authors?: string[];
    publisher?: string;
    year_of_publication?: number;
    volume?: number;
    number?: number;
    pages?: number;
    doi?: string;
    moderated?: boolean;
    status?: 'accepted' | 'denied' | 'unmoderated'; // New field to track moderation status
};

export const DefaultEmptyArticle: Article = {
    _id: undefined,
    title: '',
    authors: [], // Initialize as an empty array
    publisher: '', // Renamed from journalName to match DTO
    year_of_publication: 2024, // Update field name
    volume: 0, // Set to null by default
    number: 0, // Set to null by default
    pages: 0, // Set to 0 by default
    doi: '',
};
