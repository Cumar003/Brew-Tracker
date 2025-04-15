import { Router } from 'express';
import { OtpController } from '../../controllers/otpController';
import { AuthController } from '../../controllers/admin/authController';

const router = Router();
const authController = new AuthController();
const otpController = new OtpController();

router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));
router.post("/forgot-password", authController.forgotPassword.bind(authController));

router.post("/send-otp", otpController.sendOtp.bind(otpController));
router.post("/verify-otp", otpController.verifyOtp.bind(otpController));

export { router as publicAuthRoutes };
