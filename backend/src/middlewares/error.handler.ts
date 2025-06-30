import { NextFunction, Request, Response } from 'express';
import { ApiResponseBuilder } from '../utils/apiResponse';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    ApiResponseBuilder.error(
        res,
        'INTERNAL_SERVER_ERROR',
        'Something went wrong',
        500,
        process.env.NODE_ENV === 'development' ? err.stack : undefined
    );
};
