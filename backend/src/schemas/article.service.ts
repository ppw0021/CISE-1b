import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../schemas/article.schema';

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }
}