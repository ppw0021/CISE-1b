import { Controller, Get, Query} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('exists')
  async emailExists(@Query('email') email: string): Promise<{ exists: boolean }> {
    const exists = await this.userService.emailExists(email);
    return { exists };
  }
}