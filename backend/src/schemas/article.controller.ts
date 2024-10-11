import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
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

  // New route for updating moderation status
  @Put(':id/moderate')
  async moderateArticle(
    @Param('id') id: string,
    @Body('moderated') moderated: boolean,
    @Body('status') status: 'accepted' | 'denied' | 'unmoderated',
  ): Promise<Article> {
    return this.articleService.updateModerationStatus(id, moderated, status);
  }
}
