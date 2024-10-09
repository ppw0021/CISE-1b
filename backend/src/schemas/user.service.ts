import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec(); // Fetch all users from the database
  }
  
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
    if (user.isAdmin === null){
      return false;
    }
    else {
      return user.isAdmin;
    }
    
  }

  async updateAuthTokenByEmail(email: string, authToken: string): Promise<User | null> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { email },
      { $set: { authToken } },
      { new: true, useFindAndModify: false}
    ).exec();

    return updatedUser;
  }

  async createNewUser(email: string, passwordHash: string): Promise<User | null> {
    //Validate email and password for security
    if (!email || !passwordHash) {
      console.log('Email and password required');
      return;
    }

    //Check for existing user with the same email
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      console.log('Email exists');
      return;
    }

    try {
      //Create a new user instance
      const newUser = new this.userModel({ email, passwordHash, isAdmin: false, isAnalyst: false, isMod: false, authToken: ""});

      //Save the new user to the database
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      console.error('Error creating new user:', error);
      throw new Error('Internal server error'); //Handle generic error for security
    }
  }

  async deleteUser(authToken: string): Promise<boolean> {
    const deleted = await this.userModel.findOne
    ({ authToken }).deleteOne().exec();
    return !!deleted;

  }
}