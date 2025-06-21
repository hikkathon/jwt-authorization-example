import { Request, Response, NextFunction } from 'express';
import { ApiResponseBuilder } from '../utils/apiResponse';
import * as jwtService from '../services/jwt.service'
import { JwtPayload } from "../interfaces/JwtPayload";

export const authProtected = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            next(ApiResponseBuilder.error(
                res,
                'UNAUTHORIZED',
                'Authentication failed',
                401
            ));
        }

        const token = authHeader?.split(' ')[1];
        if (!token) {
            next(ApiResponseBuilder.error(
                res,
                'UNAUTHORIZED',
                'Authentication failed',
                401
            ));
        }
        // @ts-ignore
        const userData = jwtService.validateAccessToken(token) as JwtPayload;
        if (!userData) {
            next(ApiResponseBuilder.error(
                res,
                'UNAUTHORIZED',
                'Authentication failed',
                401
            ));
        }

        (req as any).user = userData;
        next();
    } catch (error) {
        next(ApiResponseBuilder.error(
            res,
            'UNAUTHORIZED',
            'Authentication failed',
            401
        ));
    }
};