import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async emailExists(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email }).exec();
    return !!user;
  }

  async validatePassword(email: string, passwordHash: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) return false;

    return user.passwordHash === passwordHash;
  }

  async checkAdmin(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email }).exec();
    return user.isAdmin;
  }
}