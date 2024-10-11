import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../schemas/article.schema';
export declare class ArticleService {
    private articleModel;
    constructor(articleModel: Model<ArticleDocument>);
    findAll(): Promise<Article[]>;
    addRating(articleNameIncoming: string, ratingIncoming: number): Promise<boolean>;
}
