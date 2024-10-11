import { RevArticleService } from './revarticle.service';
import { RevArticle } from './revarticle.schema';
export declare class RevArticleController {
    private readonly revArticleService;
    constructor(revArticleService: RevArticleService);
    create(revArticle: RevArticle): Promise<RevArticle>;
    findAll(): Promise<RevArticle[]>;
    findOne(id: string): Promise<RevArticle>;
    remove(id: string): Promise<RevArticle>;
    addRating(body: {
        articleName: string;
        rating: number;
    }): Promise<boolean>;
}
