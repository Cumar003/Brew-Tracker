import { Router } from 'express';
import { jwtMiddleware } from '../../middleware/jwtMiddleware';
import { UserController } from '../../controllers/userController';
import { AuthController } from '../../controllers/admin/authController';

const router = Router();
const authController = new AuthController();
const userController = new UserController();

router.use(jwtMiddleware); 

router.get('/me', userController.getUserById.bind(userController));

router.post("/reset-password", authController.resetPassword.bind(authController));
router.post("/refresh", authController.refreshToken.bind(authController));

export { router as protectedAuthRoutes };
