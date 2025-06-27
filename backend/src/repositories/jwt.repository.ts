import { prisma } from '../config/database';
import { RefreshToken } from '../generated/prisma';

export class JWTRepository {
    async createRefreshToken(
        userId: number,
        token: string,
        expiresAt: Date
    ): Promise<RefreshToken> {
        return prisma.refreshToken.create({
            data: {
                userId: userId,
                token: token,
                expiresAt: expiresAt,
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
