import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({ collection: 'articles', timestamps: true }) // Added timestamps
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

    @Prop({ required: true, unique: true }) // Ensure unique DOI
    doi: string;

    @Prop({ default: false })
    moderated: boolean;

    @Prop({ default: 'unmoderated', index: true }) // Added indexing
    status: 'accepted' | 'denied' | 'unmoderated';

    @Prop({ type: [String], required: true, default: [] }) // Changed to array of strings
    researchType: string[]; // For example: ['case study', 'experiment']
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
