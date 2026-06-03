import express from "express";
import {
  getProfileController,
  updateProfileController,
  changePasswordController,
  updateSettingsController,
  uploadAvatarController,
  deleteAccountController,
} from "../controllers/users/userControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/profile", getProfileController);
router.put("/profile", updateProfileController);
router.put("/change-password", changePasswordController);
router.put("/settings", updateSettingsController);
router.put("/avatar", uploadAvatarController);
router.delete("/delete-account", deleteAccountController);

export default router;