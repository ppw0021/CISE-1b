// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type ArticleDocument = Article & Document;

// @Schema({ collection: 'articles' }) // Use the correct collection name here
// export class Article {
//     @Prop({ required: true })
//     title: string;

//     @Prop({ type: [String], required: true }) // Array of authors
//     authors: string[];

//     @Prop({ required: true })
//     publisher: string;

//     @Prop({ required: true })
//     year_of_publication: number;

//     @Prop({ required: true }) // Add SE practice field
//     sePractice: string;

//     @Prop({ required: true }) // Add claim field
//     claim: string;
// }

// export const ArticleSchema = SchemaFactory.createForClass(Article);
