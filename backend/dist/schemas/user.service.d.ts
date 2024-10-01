import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    emailExists(email: string): Promise<boolean>;
    validatePassword(email: string, passwordHash: string): Promise<boolean>;
    checkAdmin(email: string): Promise<boolean>;
    updateAuthTokenByEmail(email: string, authToken: string): Promise<User | null>;
}
