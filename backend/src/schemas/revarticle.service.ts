import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RevArticle, RevArticleDocument } from './revarticle.schema';

@Injectable()
export class RevArticleService {
    constructor(@InjectModel(RevArticle.name) private revArticleModel: Model<RevArticleDocument>) {}

    async create(revArticle: RevArticle): Promise<RevArticle> {
        const createdRevArticle = new this.revArticleModel(revArticle);
        return createdRevArticle.save();
    }

    async findAll(): Promise<RevArticle[]> {
        return this.revArticleModel.find().exec();
    }

    async findOne(id: string): Promise<RevArticle> {
        return this.revArticleModel.findById(id).exec();
    }

    async remove(id: string): Promise<RevArticle> {
        return this.revArticleModel.findByIdAndDelete(id).exec();
    }
}
