import mongoose from 'mongoose';
import { RecordDocument } from './Record';
import db from '../db.config';
import validator from 'validator';
import moment from 'moment';

const instance = db.instance;

export interface IUser {
  name: string;
  bio?: string;
  email: string;
  password: string;
  records?: Array<RecordDocument['_id']> | RecordDocument[];
  budget?: number;
  threshold?: number;
  expenseList?: Array<String> | string[];
  incomeList?: Array<String> | string[];
  createdOn?: string;
  updatedOn?: string;
}

export type UserDocument = mongoose.Document & IUser;

const userSchema = new instance.Schema({
  name: { type: String, required: [true, 'User must have a name. '] },
  bio: { type: String, default: 'Empty bio' },
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
  records: [{ type: instance.Schema.Types.ObjectId, ref: 'Record' }],
  budget: { type: Number, default: 0 },
  threshold: { type: Number, default: 0 },
  expenseList: [{ type: String }],
  incomeList: [{ type: String }],
  createdOn: { type: Date, default: moment().format('LLL') },
  updatedOn: { type: Date, default: moment().format('LLL') },
});

export const User = instance.model<UserDocument>('User', userSchema);
