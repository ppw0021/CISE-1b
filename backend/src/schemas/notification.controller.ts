import { Controller, Get, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from '../schemas/notification.schema';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Get('getall')
  async getEveryNotifications() {
    return this.notificationService.getAllNotifications();
  }

  @Get('filterbyemail')
  async getSomeNotifications(@Body() body: { email: string }) {
    const { email } = body;
    return this.notificationService.getFilteredNotifications(email);
  }
}