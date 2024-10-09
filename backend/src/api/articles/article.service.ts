import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleDocument, Article } from './article.schema';
import { CreateArticleDto } from './create-article.dto';
import { UpdateArticleDto } from './update-article.dto'; // Use the new Update DTO

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    ) {}

    async create(createArticleDto: CreateArticleDto): Promise<Article> {
        const newArticle = new this.articleModel(createArticleDto);
        return newArticle.save();
    }

    async findAll(): Promise<Article[]> {
        return this.articleModel.find().exec();
    }

    async findByStatus(status: string): Promise<Article[]> {
        return this.articleModel.find({ status }).exec();
    }

    async update(id: string, updateArticleDto: UpdateArticleDto): Promise<Article> {
        const updatedArticle = await this.articleModel.findByIdAndUpdate(id, updateArticleDto, { new: true }).exec();
        if (!updatedArticle) {
            throw new NotFoundException('Article not found');
        }
        return updatedArticle;
    }

    async delete(id: string): Promise<Article | null> {
        return this.articleModel.findByIdAndDelete(id).exec();
    }
}
