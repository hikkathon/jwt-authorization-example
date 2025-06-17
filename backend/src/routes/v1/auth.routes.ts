import {Router} from 'express';
import * as authController from '../../controllers/v1/auth/auth.controller';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.post('/activate/:link', authController.activate);

export default router;