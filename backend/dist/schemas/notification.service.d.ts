import { Model } from 'mongoose';
import { Notification, NotificationDocument } from '../schemas/notification.schema';
export declare class NotificationService {
    private notificationModel;
    constructor(notificationModel: Model<NotificationDocument>);
    getAllNotifications(): Promise<Notification[]>;
    getFilteredNotifications(email: string): Promise<Notification[]>;
    static createNotification(email: string, note: string): Promise<boolean>;
}
