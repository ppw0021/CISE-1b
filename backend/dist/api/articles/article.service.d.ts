import { Article } from './article.schema';
import { Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';
export declare class ArticleService {
    private articleModel;
    constructor(articleModel: Model<Article>);
    findAll(): Promise<Article[]>;
    findByStatus(status: string): Promise<Article[]>;
    findOne(id: string): Promise<Article>;
    create(createArticleDto: CreateArticleDto): Promise<Article>;
    update(id: string, createArticleDto: CreateArticleDto): Promise<Article>;
    delete(id: string): Promise<Article>;
}
