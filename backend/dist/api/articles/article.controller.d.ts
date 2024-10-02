import { CreateArticleDto } from './create-article.dto';
import { ArticleService } from './article.service';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    addArticle(createArticleDto: CreateArticleDto): Promise<{
        message: string;
    }>;
    getArticles(status: string): Promise<import("./article.schema").Article[]>;
}
