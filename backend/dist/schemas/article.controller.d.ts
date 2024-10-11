import { ArticleService } from './article.service';
import { Article } from '../schemas/article.schema';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    findAll(): Promise<Article[]>;
    addRating(body: {
        articleName: string;
        rating: number;
    }): Promise<boolean>;
}
