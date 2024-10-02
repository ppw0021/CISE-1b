// // schemas/article.controller.ts
// import { Controller, Get, Post, Body } from '@nestjs/common';
// import { ArticleService } from './article.service';
// import { CreateArticleDto } from './create-article.dto'; // Import the DTO
// import { Article } from './article.schema'; // Import your Article schema

// @Controller('api/articles') // Change the route to match your intended API structure
// export class ArticleController {
//   constructor(private readonly articleService: ArticleService) {}

//   @Get()
//   async findAll(): Promise<Article[]> {
//     return this.articleService.findAll();
//   }

//   // New POST route to create an article
//   @Post()
//   async create(@Body() articleData: CreateArticleDto): Promise<Article> { // Use the DTO for validation
//     return this.articleService.create(articleData);
//   }
// }
