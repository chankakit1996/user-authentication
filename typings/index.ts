import { Request } from 'express';
import { Document, Types } from 'mongoose';
import { UserDocument } from '../models';

export interface AuthRequest extends Request {
    token: string;
    user: Document<unknown, any, UserDocument> &
        UserDocument & {
            _id: Types.ObjectId;
        };
}
