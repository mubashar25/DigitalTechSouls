import express from "express";

// 🔥 CONTROLLERS
import registerController from "../controllers/auth/registerController.js";

import loginController from "../controllers/auth/loginController.js";

import logoutController from "../controllers/auth/logoutController.js";

import meController from "../controllers/auth/meController.js";

import forgotPasswordController from "../controllers/auth/forgotPasswordController.js";

import resetPasswordController from "../controllers/auth/resetPasswordController.js";

import refreshTokenController from "../controllers/auth/refreshTokenController.js";

import verifyEmailController from "../controllers/auth/verifyEmailController.js";

// 🔥 MIDDLEWARE
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// 🔐 AUTH ROUTES
// ==========================================

// ✅ REGISTER
router.post(
  "/register",
  registerController
);

// ✅ LOGIN
router.post(
  "/login",
  loginController
);

// ✅ LOGOUT
router.post(
  "/logout",
  logoutController
);

// ✅ CURRENT USER
router.get(
  "/me",
  authMiddleware,
  meController
);

// ==========================================
// 🔑 PASSWORD ROUTES
// ==========================================

// ✅ FORGOT PASSWORD
router.post(
  "/forgot-password",
  forgotPasswordController
);

// ✅ RESET PASSWORD
router.post(
  "/reset-password/:token",
  resetPasswordController
);

// ==========================================
// 🔄 TOKEN ROUTES
// ==========================================

// ✅ REFRESH TOKEN
router.post(
  "/refresh-token",
  refreshTokenController
);

// ==========================================
// 📧 EMAIL VERIFICATION
// ==========================================

// ✅ VERIFY EMAIL
router.get(
  "/verify-email/:token",
  verifyEmailController
);

export default router;