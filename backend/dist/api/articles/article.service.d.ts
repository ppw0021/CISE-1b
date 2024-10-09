import { Model } from 'mongoose';
import { ArticleDocument, Article } from './article.schema';
import { CreateArticleDto } from './create-article.dto';
import { UpdateArticleDto } from './update-article.dto';
export declare class ArticleService {
    private articleModel;
    constructor(articleModel: Model<ArticleDocument>);
    create(createArticleDto: CreateArticleDto): Promise<Article>;
    findAll(): Promise<Article[]>;
    findByStatus(status: string): Promise<Article[]>;
    update(id: string, updateArticleDto: UpdateArticleDto): Promise<Article>;
    delete(id: string): Promise<Article | null>;
}
