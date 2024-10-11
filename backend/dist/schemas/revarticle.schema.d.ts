import { Document } from 'mongoose';
export type RevArticleDocument = RevArticle & Document;
export declare class RevArticle {
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
export declare const RevArticleSchema: import("mongoose").Schema<RevArticle, import("mongoose").Model<RevArticle, any, any, any, Document<unknown, any, RevArticle> & RevArticle & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RevArticle, Document<unknown, {}, import("mongoose").FlatRecord<RevArticle>> & import("mongoose").FlatRecord<RevArticle> & {
    _id: import("mongoose").Types.ObjectId;
}>;
