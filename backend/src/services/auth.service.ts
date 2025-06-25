import bcrypt from 'bcrypt';
import { API_URL } from '../config/env';
import { NotFoundError } from '../exceptions/NotFoundError';
import { User } from '../generated/prisma';
import { JwtPayload } from '../interfaces/JwtPayload';
import { JWTRepository } from '../repositories/jwt.repository';
import { UserRepository } from '../repositories/user.repository';
import { JWTService } from './jwt.service';
import * as mailService from './mail.service';
import { UserService } from './user.service';

type UserPublicInfo = Pick<User, 'uuid' | 'email' | 'is_active'>;

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
					<a href="${API_URL}/api/v1/auth/activate/${user.activate_link}">Активировать</a>
				</div>`
		);

		const publicUserInfo: UserPublicInfo = {
			uuid: user.uuid,
			email: user.email,
			is_active: user.is_active,
		};
		const tokens = jwtService.generateTokens({ ...publicUserInfo });

		await jwtService.createAccessToken(user.id, tokens.accessToken);
		await jwtService.createRefreshToken(user.id, tokens.refreshToken);

		return { ...publicUserInfo, tokens };
	}

	async login(email: string, password: string) {
		const user = await userService.getByEmail(email);
		if (!user) {
			throw new NotFoundError('User not found');
		}
		const isPasswordPassed = await bcrypt.compare(password, user.password_hash);
		if (!isPasswordPassed) {
			throw new NotFoundError('Incorrect password or email entered');
		}
		const publicUserInfo: UserPublicInfo = {
			uuid: user.uuid,
			email: user.email,
			is_active: user.is_active,
		};
		const tokens = jwtService.generateTokens({ ...publicUserInfo });

		await jwtService.createAccessToken(user.id, tokens.accessToken);
		await jwtService.createRefreshToken(user.id, tokens.refreshToken);

		return { ...publicUserInfo, tokens };
	}

	async logout(refreshToken: string) {
		return await jwtService.removeToken(refreshToken);
	}

	async activate(activationLink: string) {
		const user = await userService.getByActivationLink(activationLink);

		if (!user) {
			throw new NotFoundError('User not found');
		}

		if (user.is_active) {
			throw new Error('User is already activated');
		}

		user.is_active = true;
		user.updated_at = new Date();
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
		const user = await userService.getByUuId(userData.uuid);
		if (!user) {
			throw new NotFoundError('User not found');
		}
		const publicUserInfo: UserPublicInfo = {
			uuid: userData.uuid,
			email: userData.email,
			is_active: userData.is_active,
		};
		const tokens = jwtService.generateTokens({ ...publicUserInfo });

		await jwtService.createAccessToken(user.id, tokens.accessToken);
		await jwtService.createRefreshToken(user.id, tokens.refreshToken);

		return { ...publicUserInfo, tokens };
	}

	setAuthCookies = (res: { cookie: Function }, refreshToken: string) => {
		res.cookie('refreshToken', refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
			secure: true,
		});
	};
}
