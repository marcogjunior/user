import { Document, Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
}