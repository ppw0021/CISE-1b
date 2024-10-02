// components/Article.ts
export interface Article {
    title: string;
    authors: string; // Ensure the property name matches your usage
    publisher: string;
    year_of_publication: number | ''; // Allow for empty value
    volume: string;
    number: string;
    pages: string;
    doi: string;
    published_date: string; // If you use date, consider using ISO string or similar
    updated_date?: Date; // Optional field for updated date
  }
  
  export const DefaultEmptyArticle: Article = {
    title: '',
    authors: '',
    publisher: '',
    year_of_publication: '',
    volume: '',
    number: '',
    pages: '',
    doi: '',
    published_date: '',
  };
  