import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';
export declare class MessageService {
    private messageModel;
    constructor(messageModel: Model<MessageDocument>);
    create(sender: string, message: string): Promise<Message>;
    findAll(): Promise<Message[]>;
    findOne(id: string): Promise<Message>;
    update(id: string, message: string, isRead: boolean): Promise<Message>;
}
