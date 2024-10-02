import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
import { Article } from './article.schema';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    findAll(): Promise<Article[]>;
    create(articleData: CreateArticleDto): Promise<Article>;
}
