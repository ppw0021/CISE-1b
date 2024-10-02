import { Injectable } from '@nestjs/common';
import { Article } from './article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';

@Injectable()
export class ArticleService {
    constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}

    async findAll(): Promise<Article[]> {
        return await this.articleModel.find().exec();
    }

    async findByStatus(status: string): Promise<Article[]> {
        return await this.articleModel.find({ status }).exec(); // Make sure you have a 'status' field in your schema
    }

    async findOne(id: string): Promise<Article> {
        return await this.articleModel.findById(id).exec();
    }

    async create(createArticleDto: CreateArticleDto): Promise<Article> {
        return await this.articleModel.create(createArticleDto);
    }

    async update(id: string, createArticleDto: CreateArticleDto): Promise<Article> {
        return await this.articleModel.findByIdAndUpdate(id, createArticleDto, { new: true }).exec();
    }

    async delete(id: string): Promise<Article> {
        const deletedArticle = await this.articleModel.findByIdAndDelete(id).exec();
        return deletedArticle;
    }
}
