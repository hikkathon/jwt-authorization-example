import {Router} from 'express';
import * as authController from '../../controllers/v1/user/user.controller';

const router = Router();

router.get('/', authController.getUsers);

export default router;