import {Request, Response, NextFunction, RequestHandler} from 'express';
import {validationResult, ValidationError} from 'express-validator';
import {ApiResponseBuilder} from '../utils/apiResponse';

export const validate: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((err: ValidationError) => ({
            field: 'path' in err ? err.path : '',
            message: err.msg,
        }));

        ApiResponseBuilder.error(
            res,
            'VALIDATION_ERROR',
            'Invalid input data',
            422,
            formattedErrors
        );
        return;
    }
    next();
};