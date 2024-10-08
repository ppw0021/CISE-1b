import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' }) // Use the correct collection name here
export class User {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    passwordHash: string;

    @Prop({required: true})
    isAdmin: boolean;

    @Prop({required: true})
    isMod: boolean;

    @Prop({required: true})
    isAnalyst: boolean;

    @Prop({required: false})
    authToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
