import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../../services/auth.service';
import { ApiResponseBuilder } from '../../../utils/apiResponse';
import { getErrorMessage } from '../../../utils/getErrorMessage';

const authService = new AuthService();

export const registration = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password } = req.body;
		const user = await authService.register(email, password);

		authService.setAuthCookies(res, user.tokens.refreshToken);

		ApiResponseBuilder.success(res, user, 200);
	} catch (error) {
		ApiResponseBuilder.error(
			res,
			'USER_REGISTRATION_FAILED',
			'Failed to registration user',
			400,
			getErrorMessage(error)
		);
	}
};

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password } = req.body;
		const userData = await authService.login(email, password);
		authService.setAuthCookies(res, userData.tokens.refreshToken);
		ApiResponseBuilder.success(res, 'Login successful', 200, { ...userData });
	} catch (error) {
		ApiResponseBuilder.error(
			res,
			'USER_NOT_FOUND',
			'Failed to auth user',
			404,
			getErrorMessage(error)
		);
	}
};

export const logout = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { refreshToken } = req.cookies;
		const token = await authService.logout(refreshToken);
		res.clearCookie('refreshToken');
		ApiResponseBuilder.success(res, token, 200);
	} catch (error) {
		next(error);
	}
};

export const activate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const activateLink = req.params.link;

		await authService.activate(activateLink);

		ApiResponseBuilder.success(res, 'Account activation was successful', 200, {
			link: activateLink,
		});
	} catch (error) {
		ApiResponseBuilder.error(
			res,
			'USER_ACTIVATION_FAILED',
			'Failed to activation user',
			400,
			getErrorMessage(error)
		);
	}
};

export const refreshToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { refreshToken } = req.cookies;
		const userData = await authService.refreshToken(refreshToken);
		authService.setAuthCookies(res, userData.tokens.refreshToken);

		ApiResponseBuilder.success(res, userData, 200);
	} catch (error) {
		next(error);
	}
};
