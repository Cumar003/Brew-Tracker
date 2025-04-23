import { Router } from 'express';
import { AuthController } from '../../controllers/admin/authController';

const router = Router();
const authController = new AuthController();

router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));
router.post("/forgot-password", authController.forgotPassword.bind(authController));

export { router as publicAuthRoutes };
