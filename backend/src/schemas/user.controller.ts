import { Controller, Get, Post, Query, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../schemas/user.schema';
import * as crypto from 'crypto';
import { HttpService } from '@nestjs/axios';
//import { NotificationController } from './notification.controller';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('all') // This will respond to GET requests to /user
  async getUsers(): Promise<User[]> {
    return this.userService.findAllUsers(); // Fetch all users from the service
  }

  @Get('exists')
  async emailExists(@Query('email') email: string): Promise<{ exists: boolean }> {
    const exists = await this.userService.emailExists(email);
    return { exists };
  }

  @Post('emailfromtoken')
  async getEmailFromToken(@Body() body: { auth_token: string }): Promise<{ response: string }> {
    const { auth_token } = body;
    const response = await this.userService.getEmailFromAuthToken(auth_token);
    return { response };
  }
  

  generateToken(): string {
    return crypto.randomBytes(16).toString('hex'); // Generate a simple random token
  }

  @Post('validate')
  async validateUser(@Body() body: { email: string, passwordHash: string }): Promise<{ exists: boolean, valid: boolean, isAdmin: boolean, isMod: boolean, isAnalyst: boolean, authToken: string }> {
    const { email, passwordHash } = body;
    const exists = await this.userService.emailExists(email);
    let isAdmin = false;
    let isMod = false;
    let isAnalyst = false;
    let authToken = "";
    if (!exists) {
      //User does not exist
      console.log(`No matching email for ${email}`);
      return { exists, valid: false, isAdmin: false, isMod: false, isAnalyst: false, authToken };
    }
    isAdmin = await this.userService.checkAdmin(email);
    isMod = await this.userService.checkMod(email);
    isAnalyst = await this.userService.checkAnalyst(email);
    const isValid = await this.userService.validatePassword(email, passwordHash);
    if (isValid) {
      authToken = this.generateToken();
      const updatedUser = await this.userService.updateAuthTokenByEmail(email, authToken);
      if (updatedUser) {
        //Successful login and update
        console.log(`User ${email} logged in with password hash ${passwordHash}, authToken is ${authToken}`);
        return { exists, valid: isValid, isAdmin, isMod, isAnalyst, authToken };
      }
      else {
        //Failed to write to database, but credentials correct
        console.log("Failed to write to database, check Mongo or schema");
        authToken = "";
        return { exists, valid: false, isAdmin, isMod: false, isAnalyst: false, authToken };
      }
    }
    //Failed to login, wrong password
    console.log(`User ${email} used the wrong password`);
    return { exists, valid: isValid, isAdmin, isMod, isAnalyst, authToken };
  }

  @Post('register')
  async registerUser(@Body() body: { email: string, passwordHash: string }): Promise<{ alreadyExists: boolean, success: boolean, isAdmin: boolean, authToken: string }> {
    const { email, passwordHash } = body;
    const exists = await this.userService.emailExists(email);
    if (exists) {
      console.log(`Email already exists for ${email}`);
      return { alreadyExists: exists, success: false, isAdmin: false, authToken: "" };
    }

    const newUser = await this.userService.createNewUser(email, passwordHash);
    let authToken = this.generateToken();
    const updatedUser = await this.userService.updateAuthTokenByEmail(email, authToken);
    if (newUser.email != null) {

      return { alreadyExists: false, success: true, isAdmin: false, authToken: authToken };
    }
    else {
      return { alreadyExists: false, success: false, isAdmin: false, authToken: "" };
    }

  }
  @Delete(':authToken')
  async deleteUserByToken(@Param('authToken') authToken: string): Promise<{ success: boolean }> {
    console.log(`Deleting user with authToken ${authToken}`);
    const deleted = await this.userService.deleteUser(authToken);
    if (deleted) {
      console.log(`Deleted user with authToken ${authToken}`);
    }
    return { success: deleted };
  }

  //Toggle role function for any of admin, mod, or analyst
  @Put('toggleRole')
  async toggleUserRole(@Body() body: { authToken: string, role: string, status: boolean }): Promise<{ success: boolean }> {
    const { authToken, role, status } = body;

    // Find user by authToken
    const user = await this.userService.findUserByAuthToken(authToken);
    if (!user) {
      return { success: false };
    }

    // Update the user's role
    const updatedUser = await this.userService.toggleUserRole(authToken, role, status);
    if (updatedUser) {
      console.log(`Toggled ${role} role for user with authToken ${authToken}`);
      return { success: true };
    }

    return { success: false };
  }
}