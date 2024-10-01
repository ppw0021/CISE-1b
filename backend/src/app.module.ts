import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './schemas/article.module'; // Adjust the path as needed
import { UserModule } from './schemas/user.module';
import { RevArticleModule } from './schemas/revarticle.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.DB_URI), // Ensure your DB_URI is set in your environment variables
    ArticleModule, UserModule, RevArticleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
