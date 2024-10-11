import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
    // Create new article
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  async updateModerationStatus(
    id: string,
    moderated: boolean,
    status: 'accepted' | 'denied' | 'unmoderated',
    researchType?: string // Include researchType as an optional parameter
  ): Promise<Article> {
    console.log(`Updating article ${id} with status: ${status}`);
    
    const updateData: Partial<Article> = { moderated, status };

    // Update researchType only if it is provided
    if (researchType) {
      updateData.researchType = researchType;
    }

    const updatedArticle = await this.articleModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedArticle) {
      console.log(`Article ${id} not found`);
      throw new NotFoundException('Article not found');
    }

    console.log(`Updated article: ${JSON.stringify(updatedArticle)}`);
    return updatedArticle;
  }

  async checkArticleExists(title: string): Promise<boolean> {
    const article = await this.articleModel.findOne({ title }).exec();
    return !!article; // Return true if exists, false otherwise
  }

  // Add a method to fetch unmoderated articles
  async findUnmoderated(): Promise<Article[]> {
    return this.articleModel.find({ moderated: false }).exec();
  }

  async findByStatus(status: 'accepted' | 'denied' | 'unmoderated'): Promise<Article[]> {
    // Implement your logic to fetch articles based on status
    return await this.articleModel.find({ status }).exec();
  }
}
