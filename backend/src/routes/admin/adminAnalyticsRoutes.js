import express from "express";

import authMiddleware from "../../middleware/authMiddleware.js";

import adminMiddleware from "../../middleware/adminMiddleware.js";

import getRevenueStatsController from "../../controllers/admin/analytics/getRevenueStatsController.js";

import getOrdersStatsController from "../../controllers/admin/analytics/getOrdersStatsController.js";

import getUsersStatsController from "../../controllers/admin/analytics/getUsersStatsController.js";

import getSalesChartController from "../../controllers/admin/analytics/getSalesChartController.js";

const router =
  express.Router();

// 🔥 REVENUE
router.get(
  "/revenue",
  authMiddleware,
  adminMiddleware,
  getRevenueStatsController
);

// 🔥 ORDERS
router.get(
  "/orders",
  authMiddleware,
  adminMiddleware,
  getOrdersStatsController
);

// 🔥 USERS
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getUsersStatsController
);

// 🔥 SALES CHART
router.get(
  "/sales-chart",
  authMiddleware,
  adminMiddleware,
  getSalesChartController
);

export default router;