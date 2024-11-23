import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

router.use('/auth', authRoutes);
router.use(authMiddleware);
router.use('/users', userRoutes.userRouter);
router.use('/users/settings', userRoutes.settingsRouter);

export default router; 