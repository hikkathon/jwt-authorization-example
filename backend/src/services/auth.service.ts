import bcrypt from 'bcrypt';
import { API_URL } from '../config/env';
import { User } from '../generated/prisma';
import { JwtPayload } from '../interfaces/JwtPayload';
import { JWTRepository } from '../repositories/jwt.repository';
import { UserRepository } from '../repositories/user.repository';
import { JWTService } from './jwt.service';
import * as mailService from './mail.service';
import { UserService } from './user.service';
import { UserJWTPayload } from "../types/user.jwtPayload.type";

const userService = new UserService(new UserRepository());
const jwtService = new JWTService(new JWTRepository());

export class AuthService {
    async register(email: string, password: string) {
        const candidate = await userService.getByEmail(email);
        if (candidate) {
            throw new Error('A user with this email already exists');
        }
        const passwordHash = await bcrypt.hash(password, 3);
        const user: User = await userService.create(email, passwordHash);

        await mailService.sendActivationMail(
            email,
            'Активация аккаунта',
            ' ',
            `<div>
					<h1>Для активации перейдите по ссылке</h1>
					<a href="${API_URL}/api/v1/auth/activate/${user.activateLink}">Активировать</a>
				</div>`
        );

        const userJWTPayload: UserJWTPayload = {
            id: user.id,
            email: user.email,
            isActivate: user.isActivate,
        };

        return {...userJWTPayload};
    }

    async login(email: string, password: string) {
        const user = await userService.getByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordPassed = await bcrypt.compare(password, user.password);
        if (!isPasswordPassed) {
            throw new Error('Incorrect password or email entered');
        }
        const userJWTPayload: UserJWTPayload = {
            id: user.id,
            email: user.email,
            isActivate: user.isActivate,
        };
        const tokens = jwtService.generateTokens({...userJWTPayload});

        await jwtService.createRefreshToken(user.id, tokens.refreshToken);

        return {...userJWTPayload, tokens};
    }

    async logout(refreshToken: string) {
        return await jwtService.removeToken(refreshToken);
    }

    async activate(activateLink: string) {
        const user = await userService.getActivationLink(activateLink);

        if (!user) {
            throw new Error('User not found');
        }

        if (user.isActivate) {
            throw new Error('User is already activated');
        }

        user.isActivate = true;
        user.updatedAt = new Date();
        await userService.update(user.id, user);
    }

    async refreshToken(refreshToken: string) {
        if (!refreshToken) {
            throw new Error('Unauthorized error');
        }
        const userData = jwtService.validateRefreshToken(
            refreshToken
        ) as JwtPayload;
        const refreshTokenFromDb = await jwtService.findRefreshToken(refreshToken);
        if (!userData || !refreshTokenFromDb) {
            throw new Error('Unauthorized error');
        }
        const user = await userService.getByEmail(userData.email);
        if (!user) {
            throw new Error('User not found');
        }
        const userJWTPayload: UserJWTPayload = {
            id: user.id,
            email: user.email,
            isActivate: user.isActivate,
        };
        const tokens = jwtService.generateTokens({...userJWTPayload});

        await jwtService.removeToken(refreshToken);

        await jwtService.createRefreshToken(user.id, tokens.refreshToken);

        return {...userJWTPayload, tokens};
    }

    setAuthCookies(res: { cookie: Function }, refreshToken: string) {
        res.cookie('refreshToken', refreshToken, {
            //maxAge: 30 * 24 * 60 * 60 * 1000,
            maxAge: 60 * 1000,
            httpOnly: true,
            secure: true,
        });
    };
}
