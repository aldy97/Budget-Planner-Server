import { Request } from 'express';
import { UserDocument } from '../model/User';

declare module 'global' {
  export type AugmentedRequest = Request & { verifiedUser?: UserDocument };
}

declare module 'express';
