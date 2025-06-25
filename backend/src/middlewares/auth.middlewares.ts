import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from '../interfaces/JwtPayload';
import { JWTRepository } from '../repositories/jwt.repository';
import { JWTService } from '../services/jwt.service';
import { ApiResponseBuilder } from '../utils/apiResponse';

const jwtService = new JWTService(new JWTRepository());

export const authProtected = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			ApiResponseBuilder.error(
				res,
				'UNAUTHORIZED',
				'Authentication failed',
				401
			);
		}

		const token = authHeader?.split(' ')[1] || 'undefined';
		if (!token) {
			ApiResponseBuilder.error(
				res,
				'UNAUTHORIZED',
				'Authentication failed',
				401
			);
		}

		const userData = jwtService.validateAccessToken(token) as JwtPayload;
		if (!userData) {
			ApiResponseBuilder.error(
				res,
				'UNAUTHORIZED',
				'Authentication failed',
				401
			);
		}

		(req as any).user = userData;
		next();
	} catch (error) {
		ApiResponseBuilder.error(res, 'UNAUTHORIZED', 'Authentication failed', 401);
	}
};
