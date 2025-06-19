import { Request, Response, NextFunction } from 'express';
import { ApiResponseBuilder } from '../utils/apiResponse';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.log(err.stack);

    if (err.name === 'UnauthorizedError') {
        ApiResponseBuilder.error(
            res,
            'UNAUTHORIZED',
            'Authentication failed',
            401
        );
        return;
    }

    ApiResponseBuilder.error(
        res,
        'INTERNAL_SERVER_ERROR',
        'Something went wrong',
        500
    );
};