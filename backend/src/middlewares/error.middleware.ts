import {Request, Response, NextFunction} from 'express';
import ApiError from '../exceptions/api.error';

export default function errorMiddleware(
    err: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    if (err instanceof ApiError) {
        res.status(err.status).json({message: err.message});
        return;
    }
    console.error(err);
    res.status(500).json({message: 'Internal server error'});
}