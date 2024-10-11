import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  // New method to update moderation status
  async updateModerationStatus(id: string, moderated: boolean, status: 'accepted' | 'denied' | 'unmoderated'): Promise<Article> {
    const updatedArticle = await this.articleModel.findByIdAndUpdate(
      id,
      { moderated, status },
      { new: true }, // Return the updated article
    );
    if (!updatedArticle) {
      throw new NotFoundException('Article not found');
    }
    return updatedArticle;
  }
}
