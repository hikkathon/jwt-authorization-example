import jwt from 'jsonwebtoken';
import {
	JWT_ACCESS_TOKEN_SECRET,
	JWT_REFRESH_TOKEN_SECRET,
} from '../config/env';
import { JwtPayload } from '../interfaces/JwtPayload';
import { JWTRepository } from '../repositories/jwt.repository';

export class JWTService {
	constructor(private readonly jwtRepo: JWTRepository) {}

	generateTokens(payload: string | Buffer | object) {
		const accessToken = jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET!, {
			expiresIn: '1d',
		});
		const refreshToken = jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET!, {
			expiresIn: '15d',
		});
		return { accessToken, refreshToken };
	}

	async createRefreshToken(user_id: number, token: string) {
		const expiration = new Date();
		expiration.setDate(expiration.getDate() + 30);
		return this.jwtRepo.createRefreshToken(user_id, token, expiration);
	}

	async findRefreshToken(refreshToken: string) {
		return this.jwtRepo.findRefreshToken(refreshToken);
	}

	async removeToken(refreshToken: string) {
		return this.jwtRepo.removeToken(refreshToken);
	}

	validateRefreshToken(refreshToken: string): JwtPayload {
		try {
			return jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET!) as JwtPayload;
		} catch (error) {
			throw new Error('Unable to verify refresh token');
		}
	}

	validateAccessToken(accessToken: string): JwtPayload {
		try {
			return jwt.verify(accessToken, JWT_ACCESS_TOKEN_SECRET!) as JwtPayload;
		} catch (error) {
			throw new Error('Unable to verify access token');
		}
	}
}
