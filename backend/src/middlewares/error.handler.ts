import {Request, Response, NextFunction} from 'express';
import {ApiResponseBuilder} from '../utils/apiResponse';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error(err.stack);

    if (err.name === 'UnauthorizedError') {
        ApiResponseBuilder.error(
            res,
            'UNAUTHORIZED',
            'Authentication failed',
            401
        );
    }

    if (err.name === 'NotFoundError') {
        ApiResponseBuilder.error(
            res,
            'NOT_FOUND',
            'Resource not found',
            404
        );
    }

    ApiResponseBuilder.error(
        res,
        'INTERNAL_SERVER_ERROR',
        'Something went wrong',
        500,
        process.env.NODE_ENV === 'development' ? err.stack : undefined
    );
};