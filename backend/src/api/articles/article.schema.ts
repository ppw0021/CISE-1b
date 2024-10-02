import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authors: string; // Changed from author to authors

  @Prop({ required: true })
  publisher: string;

  @Prop({ type: Number }) // Year of publication as a number
  year_of_publication: number;

  @Prop({ type: String, default: null }) // Volume can be null
  volume: string | null;

  @Prop({ type: String, default: null }) // Number can be null
  number: string | null;

  @Prop({ type: String }) // Pages as a string
  pages: string;

  @Prop({ type: String }) // DOI as a string
  doi: string;

  @Prop({ type: Date, default: Date.now })
  updated_date: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
