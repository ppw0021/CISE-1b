import { Model } from 'mongoose';
import { RevArticle, RevArticleDocument } from './revarticle.schema';
export declare class RevArticleService {
    private revArticleModel;
    constructor(revArticleModel: Model<RevArticleDocument>);
    create(revArticle: RevArticle): Promise<RevArticle>;
    findAll(): Promise<RevArticle[]>;
    findOne(id: string): Promise<RevArticle>;
    remove(id: string): Promise<RevArticle>;
}
