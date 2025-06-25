import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../config/database';
import { AccessToken, RefreshToken } from '../generated/prisma';

export class JWTRepository {
    async createAccessToken(
        userId: number,
        token: string,
        expiresAt: Date
    ): Promise<AccessToken> {
        return prisma.accessToken.create({
            data: {
                user_id: userId,
                token: token,
                expires_at: expiresAt,
                jti: uuidv4(),
            },
        });
    }

    async createRefreshToken(
        userId: number,
        token: string,
        expiresAt: Date
    ): Promise<RefreshToken> {
        return prisma.refreshToken.create({
            data: {
                user_id: userId,
                token: token,
                expires_at: expiresAt,
                jti: uuidv4(),
            },
        });
    }

    async findRefreshToken(refreshToken: string): Promise<RefreshToken | null> {
        return prisma.refreshToken.findUnique({
            where: {
                token: refreshToken,
            },
        });
    }

    async removeToken(token: string): Promise<RefreshToken | null> {
        return prisma.refreshToken.delete({
            where: {
                token: token,
            },
        });
    }
}
