import jwt from 'jsonwebtoken';
import ApiError from '../utils/apiError';
import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from '../config/env';
import * as jwtModel from "../models/jwt.model";

// Проверка конфигурации при загрузке модуля
if (!JWT_ACCESS_TOKEN_SECRET || !JWT_REFRESH_TOKEN_SECRET) {
    throw new ApiError(500, 'JWT secrets are not configured');
}

export const generateTokens = (payload: string | Buffer | object) => {
    const accessToken = jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET!, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET!, { expiresIn: '30d' });
    return { accessToken, refreshToken };
}

export const createAccessToken = (user_id: number, token: string) => {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 30);
    return jwtModel.createAccessTokenForUser(user_id, token, expiration);
}

export const createRefreshToken = (user_id: number, token: string) => {
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 30);
    return jwtModel.createRefreshTokenForUser(user_id, token, expiration);
}