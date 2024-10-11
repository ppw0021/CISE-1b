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

    // New fields for moderation
    @Prop({ default: false })
    moderated: boolean;

    @Prop({ default: 'unmoderated', index: true }) // Added indexing
    status: 'accepted' | 'denied' | 'unmoderated';

    // New field for research type
    @Prop({ required: true, default: 'unknown' })  // Default to 'unknown' if not provided
    researchType: string; // For example: 'case study', 'experiment', etc.
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
