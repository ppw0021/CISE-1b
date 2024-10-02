import { Controller, Post, Body, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CreateArticleDto } from './create-article.dto'; // Adjust the import path as necessary
import { ArticleService } from './article.service'; // Ensure you have the correct service import

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Post('/')
    async addArticle(@Body() createArticleDto: CreateArticleDto) {
        try {
            createArticleDto.updated_date = new Date(); // Default to now if not provided
            await this.articleService.create(createArticleDto);
            return { message: 'Article added successfully' };
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Unable to add this Article: ' + error.message,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get('/')
    async getArticles(@Query('status') status: string) {
        try {
            const articles = status ? await this.articleService.findByStatus(status) : await this.articleService.findAll();
            return articles;
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Unable to fetch articles: ' + error.message,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
