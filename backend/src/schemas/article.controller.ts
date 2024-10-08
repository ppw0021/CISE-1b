import { Controller, Get } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from '../schemas/article.schema';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }
}