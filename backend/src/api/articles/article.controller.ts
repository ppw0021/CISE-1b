import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CreateArticleDto } from './create-article.dto'; // Adjust the import path as necessary
import { ArticleService } from './article.service'; // Ensure you have the correct service import

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('/')
  async addArticle(@Body() createArticleDto: CreateArticleDto) {
    try {
      // Check if updated_date exists; if not, initialize it
      createArticleDto.updated_date = new Date(); // Default to now if not provided

      // Call the service to create the article
      await this.articleService.create(createArticleDto);
      return { message: 'Article added successfully' };
    } catch (error) {
      // Include error message in the response
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to add this Article: ' + error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
