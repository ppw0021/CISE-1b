import { ArticleService } from './article.service';
import { Article } from '../schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    checkArticleExists(title: string): Promise<{
        exists: boolean;
    }>;
    findAll(): Promise<Article[]>;
    create(createArticleDto: CreateArticleDto): Promise<Article>;
    moderateArticle(id: string, moderated: boolean, status: 'accepted' | 'denied' | 'unmoderated', researchType?: string[]): Promise<Article>;
    acceptArticle(id: string): Promise<Article>;
    denyArticle(id: string): Promise<Article>;
    findUnmoderated(): Promise<Article[]>;
    getModeratedArticles(status: 'accepted' | 'denied' | 'unmoderated'): Promise<Article[]>;
    update(id: string, updateArticleDto: CreateArticleDto): Promise<Article>;
}
