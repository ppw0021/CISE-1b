import { Controller, Get, Post, Body } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from '../schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  // POST request for creating a new article
  @Post()
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articleService.create(createArticleDto);
  }
}
