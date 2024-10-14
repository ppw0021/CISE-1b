import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from '../schemas/notification.schema';

@Injectable()
export class NotificationService {
  constructor(@InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>) { }

  async getAllNotifications(): Promise<Notification[]> {
    return this.notificationModel.find({}).exec();
  }

  async getFilteredNotifications(email: string): Promise<Notification[]> {
    return this.notificationModel.find({ recipient: email }).exec();
  }

  async createNotification(email: string, note: string): Promise<Notification> {
    const newNotification = new this.notificationModel({
      recipient: email,
      note: note,
      createdAt: new Date(),
    });
    return newNotification.save();
  }
}
