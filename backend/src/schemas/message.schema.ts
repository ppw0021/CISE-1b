import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ collection: 'messages', timestamps: true })
export class Message {

    @Prop({ required: true })
    message: string;

    @Prop({ required: true })
    sender: string;

    @Prop({ default: false })
    accepted: boolean;

    @Prop({ default: false })
    viewed: boolean;

}

export const MessageSchema = SchemaFactory.createForClass(Message);