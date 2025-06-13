import jwt from 'jsonwebtoken';
import ApiError from '../utils/apiError';
import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from '../config/env';
import * as jwtModel from "../models/jwt.model";

const currentDate = new Date();

export const generateTokens = (payload:  string | Buffer | object) => {
    if (!JWT_ACCESS_TOKEN_SECRET) {
        throw new ApiError(500, 'JWT_ACCESS_TOKEN_SECRET is not defined');
    }
    if (!JWT_REFRESH_TOKEN_SECRET) {
        throw new ApiError(500, 'JWT_ACCESS_TOKEN_SECRET is not defined');
    }
    const accessToken = jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET, {expiresIn:'30m'});
    const refreshToken = jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET, {expiresIn:'30d'});

    return {accessToken, refreshToken};
}

export const createAccessToken = async (user_id: number, accessToken: string) => {
    currentDate.setMinutes(currentDate.getMinutes() + 30);
    return  jwtModel.createAccessTokenForUser(user_id, accessToken, currentDate);
}

export const createRefreshToken = async (user_id: number, accessToken: string) => {
    currentDate.setDate(currentDate.getDate() + 30);
    return  jwtModel.createRefreshTokenForUser(user_id, accessToken, currentDate);
}
