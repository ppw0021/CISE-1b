import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findAllUsers(): Promise<User[]>;
    emailExists(email: string): Promise<boolean>;
    validatePassword(email: string, passwordHash: string): Promise<boolean>;
    checkAdmin(email: string): Promise<boolean>;
    checkMod(email: string): Promise<boolean>;
    checkAnalyst(email: string): Promise<boolean>;
    updateAuthTokenByEmail(email: string, authToken: string): Promise<User | null>;
    createNewUser(email: string, passwordHash: string): Promise<User | null>;
    deleteUser(authToken: string): Promise<boolean>;
    findUserByAuthToken(authToken: string): Promise<User | null>;
    toggleUserRole(authToken: string, role: string, status: boolean): Promise<UserDocument | null>;
}
