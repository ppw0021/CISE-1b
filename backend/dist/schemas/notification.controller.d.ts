import { NotificationService } from './notification.service';
import { Notification } from '../schemas/notification.schema';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getEveryNotifications(): Promise<Notification[]>;
    getSomeNotifications(body: {
        email: string;
    }): Promise<Notification[]>;
}
