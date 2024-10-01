import { Model, Document } from 'mongoose';
interface IUser extends Document {
    email: string;
    passwordHash: string;
    isAdmin: boolean;
    authToken: String;
}
declare const User: Model<IUser>;
export default User;
