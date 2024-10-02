import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({ collection: 'articles' }) // Use the correct collection name here
export class Article {
    @Prop({ required: true })
    title: string;

    @Prop({ type: [String], required: true }) // Array of authors
    authors: string[];

    @Prop({ required: true })
    publisher: string;

    @Prop({ required: true })
    year_of_publication: number;

    @Prop({ type: Number, default: null })
    volume?: number | null;

    @Prop({ type: Number, default: null })
    number?: number | null;

    @Prop({ required: true }) // If pages are meant to be a string, change to String
    pages: string; // Or keep as number if you're sure it'll be a number

    @Prop({ required: true })
    doi: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
