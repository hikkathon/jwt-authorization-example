import {RefreshToken, AccessToken} from '../generated/prisma';
import {prisma} from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export const createAccessTokenForUser = async (userId: number, token: string, expiresAt: Date) : Promise<AccessToken> => {
    return  prisma.accessToken.create({
        data: {
            user_id: userId,
            token: token,
            expires_at: expiresAt,
            jti: uuidv4()
        }
    });
};

export const createRefreshTokenForUser = async (userId: number, token: string, expiresAt: Date) : Promise<RefreshToken>=> {
    return prisma.refreshToken.create({
        data: {
            user_id: userId,
            token: token,
            expires_at: expiresAt,
            jti: uuidv4()
        }
    });
};