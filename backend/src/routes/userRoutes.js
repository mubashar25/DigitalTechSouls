import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import getProfileController from "../controllers/users/getProfileController.js";

import updateProfileController from "../controllers/users/updateProfileController.js";

import changePasswordController from "../controllers/users/changePasswordController.js";

import deleteAccountController from "../controllers/users/deleteAccountController.js";

const router = express.Router();

// 👤 PROFILE
router.get(
  "/profile",
  authMiddleware,
  getProfileController
);

// ✏️ UPDATE PROFILE
router.put(
  "/profile",
  authMiddleware,
  updateProfileController
);

// 🔐 CHANGE PASSWORD
router.put(
  "/change-password",
  authMiddleware,
  changePasswordController
);

// ❌ DELETE ACCOUNT
router.delete(
  "/delete",
  authMiddleware,
  deleteAccountController
);

export default router;