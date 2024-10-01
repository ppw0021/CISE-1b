import mongoose, { Schema, Model, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  passwordHash: string;
  isAdmin: boolean;
  authToken: String;
}

const userSchema: Schema<IUser>= new Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true, },
    isAdmin: { type: Boolean, default: false, required: true},
    authToken: { type: String, required: true},
   
});

// Create a Model.
const User: Model<IUser> = mongoose.models.User || mongoose.model('User', userSchema);

export default User;