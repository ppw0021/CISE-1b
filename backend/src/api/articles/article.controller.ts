import { Controller, Post, Body, Get, Query, Delete, Patch, Param, HttpException, HttpStatus } from '@nestjs/common';
import { CreateArticleDto } from './create-article.dto';
import { UpdateArticleDto } from './update-article.dto';  // Import the new Update DTO
import { ArticleService } from './article.service';

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Post('/')
    async addArticle(@Body() createArticleDto: CreateArticleDto) {
        try {
            createArticleDto.updated_date = new Date();
            if (createArticleDto.moderated === undefined) {
                createArticleDto.moderated = false;  // Set default to false
            }
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

    @Patch(':id/accept')
    async acceptArticle(@Param('id') id: string) {
        try {
            const updatedArticle = await this.articleService.update(id, { moderated: true } as UpdateArticleDto);
            return updatedArticle;
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'Cannot accept article: ' + error.message,
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Delete(':id')
    async deleteArticle(@Param('id') id: string) {
        try {
            const deletedArticle = await this.articleService.delete(id);
            if (!deletedArticle) {
                throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
            }
            return { message: 'Article deleted successfully' };
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'Cannot delete article: ' + error.message,
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }
}
