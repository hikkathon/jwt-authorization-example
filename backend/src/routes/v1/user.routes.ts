import {Router} from 'express';
import * as userController from '../../controllers/v1/user/user.controller';
import * as authMiddlewares  from '../../middlewares/auth.middlewares'

const router = Router();

router.get('/', authMiddlewares.authProtected, userController.getUsers);

export default router;