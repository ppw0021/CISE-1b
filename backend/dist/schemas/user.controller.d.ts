import { UserService } from './user.service';
import { User } from '../schemas/user.schema';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(): Promise<User[]>;
    emailExists(email: string): Promise<{
        exists: boolean;
    }>;
    generateToken(): string;
    validateUser(body: {
        email: string;
        passwordHash: string;
    }): Promise<{
        exists: boolean;
        valid: boolean;
        isAdmin: boolean;
        isMod: boolean;
        isAnalyst: boolean;
        authToken: string;
    }>;
    registerUser(body: {
        email: string;
        passwordHash: string;
    }): Promise<{
        alreadyExists: boolean;
        success: boolean;
        isAdmin: boolean;
        authToken: string;
    }>;
    deleteUserByToken(authToken: string): Promise<{
        success: boolean;
    }>;
    toggleUserRole(body: {
        authToken: string;
        role: string;
        status: boolean;
    }): Promise<{
        success: boolean;
    }>;
}
