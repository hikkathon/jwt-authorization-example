import { Router } from 'express';
import { UserController } from '../../controllers/v1/user/user.controller';
import * as authMiddlewares from '../../middlewares/auth.middlewares';

const router = Router();

const controller = new UserController();

router.get(
	'/',
	authMiddlewares.authProtected,
	controller.getUsers.bind(controller)
);

export default router;
