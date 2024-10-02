import { Model } from 'mongoose';
import { Article, ArticleDocument } from './article.schema';
import { CreateArticleDto } from './create-article.dto';
export declare class ArticleService {
    private articleModel;
    constructor(articleModel: Model<ArticleDocument>);
    findAll(): Promise<Article[]>;
    create(articleData: CreateArticleDto): Promise<Article>;
}
