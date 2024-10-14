import { Controller, Get, Body, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from '../schemas/notification.schema';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Get('getall')
  async getEveryNotifications() {
    return this.notificationService.getAllNotifications();
  }

  @Post('filterbyemail')
  async getSomeNotifications(@Body() body: { email: string }) {
    const { email } = body;
    return this.notificationService.getFilteredNotifications(email);
  }

  @Post('makenotification')
  async makeNotification(@Body() body: { email: string, note: string }) {
    const { email, note } = body;
    return this.notificationService.createNotification(email, note);
  }
}