import {Response} from 'express';
import {ApiResponse} from '../types/api.type';

export class ApiResponseBuilder {
    static success<T>(
        res: Response,
        data: T,
        statusCode: number = 200,
        meta?: any
    ): Response<ApiResponse<T>> {
        const response: ApiResponse<T> = {
            success: true,
            data,
        };

        if (meta) {
            response.meta = meta;
        }

        return res.status(statusCode).json(response);
    }

    static error(
        res: Response,
        code: string,
        message: string,
        statusCode: number = 400,
        details?: any
    ): Response<ApiResponse> {
        return res.status(statusCode).json({
            success: false,
            error: {
                code,
                message,
                details,
            },
        });
    }
}