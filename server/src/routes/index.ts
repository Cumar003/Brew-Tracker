import { Router } from 'express';
import { publicAuthRoutes } from './auth/public.routes';
import { protectedAuthRoutes } from './auth/protected.routes';

const router = Router();

router.use('/api/auth', publicAuthRoutes); 
router.use('/api/auth', protectedAuthRoutes); // Protected routes (JWT required)

export { router };
