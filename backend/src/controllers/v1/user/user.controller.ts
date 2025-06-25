import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../../../repositories/user.repository';
import { UserService } from '../../../services/user.service';
import { ApiResponseBuilder } from '../../../utils/apiResponse';

const userService = new UserService(new UserRepository());

export class UserController {
	async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const usersData = await userService.getAllUsers();
			ApiResponseBuilder.success(res, { ...usersData }, 200);
		} catch (error) {
			next(error);
		}
	}
}
