import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
export declare class ArticleService {
    private articleModel;
    constructor(articleModel: Model<ArticleDocument>);
    findAll(): Promise<Article[]>;
    create(createArticleDto: CreateArticleDto): Promise<Article>;
    updateModerationStatus(id: string, moderated: boolean, status: 'accepted' | 'denied' | 'unmoderated', researchType?: string[]): Promise<Article>;
    checkArticleExists(title: string): Promise<boolean>;
    findUnmoderated(): Promise<Article[]>;
    findByStatus(status: 'accepted' | 'denied' | 'unmoderated'): Promise<Article[]>;
    update(id: string, updateArticleDto: CreateArticleDto): Promise<Article>;
}
