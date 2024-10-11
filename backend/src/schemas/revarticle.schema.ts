import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type RevArticleDocument = RevArticle & Document;

@Schema()
export class RevArticle {

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    _id: string; // Change to ObjectId    

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    year_of_publication: number;

    @Prop({ required: true })
    journal_or_conference: string;

    @Prop({ required: true })
    se_practice: string;

    @Prop({ required: true })
    claim: string;

    @Prop({ required: true })
    evidence_result: 'agree' | 'disagree';

    @Prop({ required: true })
    research_type: 'case study' | 'experiment';

    @Prop({ required: true })
    participant_type: 'Student' | 'Practitioner';

    @Prop({ required: true })
    authors: string[];

    @Prop({ default: Date.now })
    created_at: Date;

    @Prop({ default: Date.now })
    updated_at: Date;

    @Prop({ required: false})
    one_star_reviews: number;

    @Prop({ required: false})
    two_star_reviews: number;

    @Prop({ required: false})
    three_star_reviews: number;

    @Prop({ required: false})
    four_star_reviews: number;

    @Prop({ required: false})
    five_star_reviews: number;
}

export const RevArticleSchema = SchemaFactory.createForClass(RevArticle);
