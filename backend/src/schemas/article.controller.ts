import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from '../schemas/article.schema';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  @Post()
  async addRating(@Body() body: { articleName: string, rating: number }): Promise<boolean> {
    const { articleName, rating } = body;
    return this.articleService.addRating(articleName, rating);
  }
}