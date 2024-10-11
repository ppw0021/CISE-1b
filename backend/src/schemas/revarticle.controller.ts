import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RevArticleService } from './revarticle.service';
import { RevArticle } from './revarticle.schema';

@Controller('revarticle')
export class RevArticleController {
    constructor(private readonly revArticleService: RevArticleService) { }

    @Post()
    async create(@Body() revArticle: RevArticle) {
        return this.revArticleService.create(revArticle);
    }

    @Get()
    async findAll() {
        return this.revArticleService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.revArticleService.findOne(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.revArticleService.remove(id);
    }


    @Post('addrating')
    async addRating(@Body() body: { articleName: string, rating: number }): Promise<boolean> {
        const { articleName, rating } = body;
        console.log(`Article Name: ${articleName} and rating: ${rating}`);
        return this.revArticleService.addRating(articleName, rating);
    }
}
