import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RevArticle, RevArticleDocument } from './revarticle.schema';

@Injectable()
export class RevArticleService {
    constructor(@InjectModel(RevArticle.name) private revArticleModel: Model<RevArticleDocument>) { }

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

    async addRating(articleNameIncoming: string, ratingIncoming: number): Promise<boolean> {
        if (ratingIncoming == 1) {
            const result = await this.revArticleModel.findOneAndUpdate(
                { title: articleNameIncoming },
                { $inc: { one_star_reviews: 1 } },
                { new: true }
            )
            console.log(`Rating: ${ratingIncoming} result: ${result}`);
            return result ? true : false;
        } else if (ratingIncoming == 2) {
            const result = await this.revArticleModel.findOneAndUpdate(
                { title: articleNameIncoming },
                { $inc: { two_star_reviews: 1 } },
                { new: true }
            )
            console.log(`Rating: ${ratingIncoming} result: ${result}`);
            return result ? true : false;
        } else if (ratingIncoming == 3) {
            const result = await this.revArticleModel.findOneAndUpdate(
                { title: articleNameIncoming },
                { $inc: { three_star_reviews: 1 } },
                { new: true }
            )
            console.log(`Rating: ${ratingIncoming} result: ${result}`);
            return result ? true : false;
        } else if (ratingIncoming == 4) {
            const result = await this.revArticleModel.findOneAndUpdate(
                { title: articleNameIncoming },
                { $inc: { four_star_reviews: 1 } },
                { new: true }
            )
            console.log(`Rating: ${ratingIncoming} result: ${result}`);
            return result ? true : false;
        } else {
            const result = await this.revArticleModel.findOneAndUpdate(
                { title: articleNameIncoming },
                { $inc: { five_star_reviews: 1 } },
                { new: true }
            )
            console.log(`Rating: ${ratingIncoming} result: ${result}`);
            return result ? true : false;
        }
    }
}
