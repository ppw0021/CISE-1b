import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { Request } from 'express';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Post('submit')
    async create(@Body() body: { storedAuthToken: string; message: string }, @Req() req: Request) {
        return this.messageService.create(body.storedAuthToken, body.message);  // Pass both sender and message to the service
    }

    @Get()
    async findAll() {
        return this.messageService.findAll();
    }
}

