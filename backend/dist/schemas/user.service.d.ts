import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    emailExists(email: string): Promise<boolean>;
    validatePassword(email: string, passwordHash: string): Promise<boolean>;
}
