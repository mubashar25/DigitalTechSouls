import express from "express";

import authMiddleware from "../../middleware/authMiddleware.js";

import adminMiddleware from "../../middleware/adminMiddleware.js";

import getDashboardStatsController from "../../controllers/admin/dashboard/getDashboardStatsController.js";

const router = express.Router();

router.get(
  "/stats",
  authMiddleware,
  adminMiddleware,
  getDashboardStatsController
);

export default router;