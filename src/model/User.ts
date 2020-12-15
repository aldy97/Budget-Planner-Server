import mongoose from 'mongoose';
import db from '../db.config';
import validator from 'validator';

const instance = db.instance;

export interface IUser {
  name: string;
  bio?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  createdOn?: Date;
  updatedOn?: Date;
}

export type UserDocument = mongoose.Document & IUser;

const userSchema = new instance.Schema({
  name: { type: String, required: [true, 'User must have a name. '] },
  bio: { type: String, default: '' },
  email: {
    type: String,
    unique: true,
    required: [true, 'User must have an email address.'],
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    select: false,
  },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
});

export const User = instance.model<UserDocument>('User', userSchema);
