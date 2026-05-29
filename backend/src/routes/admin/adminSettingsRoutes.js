import express from "express";

import authMiddleware from "../../middleware/authMiddleware.js";

import adminMiddleware from "../../middleware/adminMiddleware.js";

import getSiteSettingsController from "../../controllers/admin/settings/getSiteSettingsController.js";

import updateSiteSettingsController from "../../controllers/admin/settings/updateSiteSettingsController.js";

const router =
  express.Router();

// 🔥 PROTECTED ADMIN ROUTES
router.use(
  authMiddleware,
  adminMiddleware
);

// 🔥 GET SETTINGS
router.get(
  "/",
  getSiteSettingsController
);

// 🔥 UPDATE SETTINGS
router.put(
  "/",
  updateSiteSettingsController
);

export default router;