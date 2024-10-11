import mongoose, { Document } from 'mongoose';
export type RevArticleDocument = RevArticle & Document;
export declare class RevArticle {
    _id: string;
    title: string;
    year_of_publication: number;
    journal_or_conference: string;
    se_practice: string;
    claim: string;
    evidence_result: 'agree' | 'disagree';
    research_type: 'case study' | 'experiment';
    participant_type: 'Student' | 'Practitioner';
    authors: string[];
    created_at: Date;
    updated_at: Date;
    one_star_reviews: number;
    two_star_reviews: number;
    three_star_reviews: number;
    four_star_reviews: number;
    five_star_reviews: number;
}
export declare const RevArticleSchema: mongoose.Schema<RevArticle, mongoose.Model<RevArticle, any, any, any, mongoose.Document<unknown, any, RevArticle> & RevArticle & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, RevArticle, mongoose.Document<unknown, {}, mongoose.FlatRecord<RevArticle>> & mongoose.FlatRecord<RevArticle> & Required<{
    _id: string;
}>>;
