import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RevArticleController } from './revarticle.controller';
import { RevArticleService } from './revarticle.service';
import { RevArticle, RevArticleSchema } from './revarticle.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: RevArticle.name, schema: RevArticleSchema }]),
    ],
    controllers: [RevArticleController],
    providers: [RevArticleService],
})
export class RevArticleModule {}
