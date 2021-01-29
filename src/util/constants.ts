require('dotenv').config();

export const MESSAGES = {
  USER_NOT_EXIST: 'This user does not exist',
  RECORD_NOT_FOUND: 'Record is not found',
  RECORD_ID_NOT_PROVIDED: 'Record ID is not provided',
  DEL_RECORD_SUCC: 'Record is deleted successfully!',
  ADD_RECORD_SUCC: 'Record is added successfully!',
  UPDATE_RECORD_SUCC: 'Record is updated successfully',
  UPDATE_USERINFO_SUCC: 'User information is updated successfully',
  COMMENT_ID_NOT_FOUND: 'Comment id does not exist',
  COMMENT_ID_NOT_PROVIDED: 'Please provide comment id',
  CONFIRM_PASSWORD_EMPTY: 'Please confirm your password.',
  DUPLICATE_EMAIL: 'User already exists. Email is already used.',
  EMAIL_CANNOT_CHANGE: 'You cannot change your email address',
  EMPTY_COMMENT: 'Comment cannot be empty.',
  EMPTY_EMAIL: 'Email cannot be empty.',
  EMPTY_NAME: 'Name cannot be empty',
  EMPTY_USER_ID: 'User id is not provided',
  EMPTY_PASSWORD: 'Password cannot be empty',
  EMPTY_TYPE: 'Record type is not provided',
  EMPTY_CAT: 'Record Category is empty',
  EMPTY_AMOUNT: 'Record amount is not provided',
  EMPTY_RECORD_DATE: 'Record date is not provided',
  INVALID_EMAIL: 'Email has invalid format',
  EMAIL_REGISTER: 'This email has been registered',
  NO_USER_FOR_THIS_TOKEN: 'The user corresponding to this token no longer exists.',
  NOT_LOGGED_IN: 'You are not logged in. Please log in to complete this action.',
  PASSWORD_TOO_SHORT: 'Password must be 7 characters or longer.',
  PASSWORDS_DO_NOT_MATCH: 'Passwords do not match.',
  SUDO_ACCESS_ONLY: 'You need sudo privilege to access this route.',
  UNAUTHORIZED: 'You are not authorized to complete this action.',
  UNEXPECTED_ERROR: 'Unexpected error',
  USER_ID_NOT_FOUND: 'User id does not exist.',
  USER_ID_NOT_PROVIDED: 'Please provide user id.',
  WRONG_CREDENTIALS: 'Email or password is wrong.',
  NO_RECODS_FOUND: 'No matching records.',
};

export const PRODUCTION_DB = `mongodb+srv://fengxiong:${process.env.DB_PASSWORD}@cluster0.wcmco.mongodb.net/test?retryWrites=true&w=majority`;
export const MONGODB = 'mongodb://localhost:27017/db';
export const DEFAULT_PORT = 7001;
