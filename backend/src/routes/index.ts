import { Router } from 'express';
import v1AuthRoutes from './v1/auth.routes';
import v1UserRoutes from './v1/user.routes';

const router = Router();

router.use('/v1/auth', v1AuthRoutes);
router.use('/v1/users', v1UserRoutes);

export default router;
