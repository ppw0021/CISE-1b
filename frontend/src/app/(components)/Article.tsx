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
    status?: 'accepted' | 'denied' | 'unmoderated';
    researchType?: string[]; // Add this field to the Article type
};

export const DefaultEmptyArticle: Article = {
    _id: undefined,
    title: '',
    authors: [], // Initialize as an empty array
    publisher: '',
    year_of_publication: 2024,
    volume: 0,
    number: 0,
    pages: 0,
    doi: '',
    researchType: [], // Initialize with an empty string or default value
};
