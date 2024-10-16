import mongoose, { Document } from 'mongoose';
export type NotificationDocument = Notification & Document;
export declare class Notification {
    _id: string;
    recipient: string;
    note: string;
}
export declare const NotificationSchema: mongoose.Schema<Notification, mongoose.Model<Notification, any, any, any, mongoose.Document<unknown, any, Notification> & Notification & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Notification, mongoose.Document<unknown, {}, mongoose.FlatRecord<Notification>> & mongoose.FlatRecord<Notification> & Required<{
    _id: string;
}>>;
