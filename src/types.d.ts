import { Request } from 'express';

declare module 'express' {
    interface Request extends Request {
        userId?: string;
    }
}