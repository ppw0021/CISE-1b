import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller'; // Make sure it's lower case
import { ArticleService } from './article.service'; // Make sure it's lower case
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './article.schema'; // Make sure it's lower case

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService], // Export if used in other modules
})
export class ArticleModule {}
