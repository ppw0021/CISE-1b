import { Controller, Get, Post, Put, Patch, Param, Body, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from '../schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // New endpoint to check for duplicate articles
  @Get('exists')
  async checkArticleExists(@Query('title') title: string) {
      const exists = await this.articleService.checkArticleExists(title);
      return { exists };
  }

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

  // New PATCH route for accepting an article
  @Patch(':id/accept')
  async acceptArticle(@Param('id') id: string): Promise<Article> {
    return this.articleService.updateModerationStatus(id, true, 'accepted');
  }

  @Patch(':id/deny')
  async denyArticle(@Param('id') id: string): Promise<Article> {
      console.log(`Denying article with ID: ${id}`); // This should log the ID you passed
      return this.articleService.updateModerationStatus(id, true, 'denied');
  }


  
}
