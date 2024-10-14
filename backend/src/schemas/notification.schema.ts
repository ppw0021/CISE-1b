import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    _id: string; // Change to ObjectId    

    @Prop({ required: true })
    recipient: string;

    @Prop({ required: true })
    note: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
