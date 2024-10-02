// // schemas/article.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Article, ArticleDocument } from './article.schema'; // Adjusted import
// import { CreateArticleDto } from './create-article.dto'; // Import the DTO

// @Injectable()
// export class ArticleService {
//   constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

//   async findAll(): Promise<Article[]> {
//     return this.articleModel.find().exec();
//   }

//   // Updated method to create an article
//   async create(articleData: CreateArticleDto): Promise<Article> {
//     const newArticle = new this.articleModel(articleData);
//     return newArticle.save();
//   }
// }
