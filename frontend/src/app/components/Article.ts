// Article.ts

export interface Article {
  _id: string;
  title: string;
  authors: string;
  publisher: string;
  year_of_publication: number;
  volume?: string;
  number?: string;
  pages?: string;
  doi?: string;
  updated_date?: Date;
  isModerated?: boolean; // Field to check if the article has been moderated
}

export const DefaultEmptyArticle: Article = {
  _id: "",
  title: "",
  authors: "",
  publisher: "",
  year_of_publication: 0,
};
