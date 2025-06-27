import { Router } from 'express';
import * as authController from '../../controllers/v1/auth/auth.controller';
import { validate } from '../../middlewares/validate';
import { authValidator } from '../../validators/auth.validator';

const router = Router();

router.post('/registration', authValidator.auth(), validate, authController.registration);
router.post('/login', authValidator.auth(), validate, authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.get('/activate/:link', authValidator.activation(), validate, authController.activate);

export default router;
