import { Request } from 'express';
import { MessageService } from './message.service';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    create(body: {
        storedAuthToken: string;
        message: string;
    }, req: Request): Promise<import("./message.schema").Message>;
    findAll(): Promise<import("./message.schema").Message[]>;
}
