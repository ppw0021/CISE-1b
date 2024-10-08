import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RevArticleDocument = RevArticle & Document;

@Schema()
export class RevArticle {
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
}

export const RevArticleSchema = SchemaFactory.createForClass(RevArticle);
