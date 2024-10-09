import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({ collection: 'articles' })
export class Article {
    @Prop({ required: true })
    title: string;

    @Prop({ type: [String], required: true })
    authors: string[];

    @Prop({ required: true })
    publisher: string;

    @Prop({ required: true })
    year_of_publication: number;

    @Prop({ type: Number, default: null })
    volume?: number | null;

    @Prop({ type: Number, default: null })
    number?: number | null;

    @Prop({ required: true })
    pages: number;

    @Prop({ required: true })
    doi: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
