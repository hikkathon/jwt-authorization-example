import {Router} from 'express';
import * as authController from '../../controllers/v1/auth/auth.controller';
import {authValidator} from "../../validators/auth.validator";
import {validate} from "../../middlewares/validate";

const router = Router();

router.post('/registration', authValidator.registration(), validate, authController.registration);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.get('/activate/:link', authController.activate);

export default router;