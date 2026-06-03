import express from "express";
import registerController from "../controllers/auth/registerController.js";
import loginController from "../controllers/auth/loginController.js";
import {
  logoutController,
  meController,
  refreshTokenController,
  verifyEmailController,
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/auth/authControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { authLimiter } from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

router.post("/register", authLimiter, registerController);
router.post("/login", authLimiter, loginController);
router.post("/logout", logoutController);
router.post("/refresh-token", refreshTokenController);
router.get("/me", authMiddleware, meController);
router.get("/verify-email", verifyEmailController);
router.post("/forgot-password", authLimiter, forgotPasswordController);
router.post("/reset-password", resetPasswordController);

export default router;