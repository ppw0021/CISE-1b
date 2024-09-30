import { Controller, Get, Post, Query, Body} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('exists')
  async emailExists(@Query('email') email: string): Promise<{ exists: boolean }> {
    const exists = await this.userService.emailExists(email);
    return { exists };
  }

  @Post('validate')
  async validateUser(@Body() body: {email: string, passwordHash: string}): Promise<{ exists: boolean, valid: boolean , isAdmin: boolean}> {
    const { email, passwordHash } = body;
    console.log(`User ${email} logged in with password hash ${passwordHash}`);
    const exists = await this.userService.emailExists(email);
    const isAdmin = await this.userService.checkAdmin(email);
    if (!exists) {
      return { exists, valid: false, isAdmin};
    }

    const isValid = await this.userService.validatePassword(email, passwordHash);
    return { exists, valid: isValid, isAdmin};
  }
}