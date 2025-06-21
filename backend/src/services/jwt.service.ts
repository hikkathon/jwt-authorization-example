import jwt from 'jsonwebtoken';
import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from '../config/env';
import * as jwtModel from "../models/jwt.model";
import { JwtPayload } from "../interfaces/JwtPayload";

if (!JWT_ACCESS_TOKEN_SECRET || !JWT_REFRESH_TOKEN_SECRET) {
    throw new Error('JWT secrets are not configured');
}

export const generateTokens = (payload: string | Buffer | object) => {
    const accessToken = jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET!, {expiresIn: '30s'});
    const refreshToken = jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET!, {expiresIn: '1m'});
    return {accessToken, refreshToken};
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

export const findRefreshToken = (refreshToken: string) => {
    return jwtModel.findRefreshToken(refreshToken);
}

export const removeToken = (refreshToken: string) => {
    return jwtModel.removeToken(refreshToken);
}

export const validateRefreshToken = (refreshToken: string): JwtPayload => {
    try {
        return jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET!) as JwtPayload;
    } catch (error) {
        throw new Error("Unable to verify refresh token");
    }
}

export const validateAccessToken = (accessToken: string): JwtPayload => {
    try {
        return jwt.verify(accessToken, JWT_ACCESS_TOKEN_SECRET!) as JwtPayload;
    } catch (error) {
        throw new Error("Unable to verify access token");
    }
}