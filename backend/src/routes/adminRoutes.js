import express from "express";
import {
  getDashboardStatsController,
  getAllUsersController,
  getUserByIdController,
  updateUserRoleController,
  blockUserController,
  deleteUserController,
  getAllOrdersController,
  updateOrderStatusController,
  getAllHostingController,
  updateHostingStatusController,
  getHostingPlansAdminController,
  createHostingPlanController,
  updateHostingPlanController,
  deleteHostingPlanController,
  getAllDomainsAdminController,
  getDomainPricingController,
  updateDomainPricingController,
  getAllPaymentsController,
  getSiteSettingsController,
  updateSiteSettingsController,
} from "../controllers/admin/adminControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(authMiddleware, adminMiddleware);

// Dashboard
router.get("/dashboard", getDashboardStatsController);

// Users
router.get("/users", getAllUsersController);
router.get("/users/:id", getUserByIdController);
router.put("/users/:id/role", updateUserRoleController);
router.put("/users/:id/block", blockUserController);
router.delete("/users/:id", deleteUserController);

// Orders
router.get("/orders", getAllOrdersController);
router.put("/orders/:id/status", updateOrderStatusController);

// Hosting subscriptions
router.get("/hosting", getAllHostingController);
router.put("/hosting/:id/status", updateHostingStatusController);

// Hosting plans
router.get("/hosting-plans", getHostingPlansAdminController);
router.post("/hosting-plans", createHostingPlanController);
router.put("/hosting-plans/:id", updateHostingPlanController);
router.delete("/hosting-plans/:id", deleteHostingPlanController);

// Domains
router.get("/domains", getAllDomainsAdminController);
router.get("/domain-pricing", getDomainPricingController);
router.put("/domain-pricing/:id", updateDomainPricingController);

// Payments
router.get("/payments", getAllPaymentsController);

// Settings
router.get("/settings", getSiteSettingsController);
router.put("/settings", updateSiteSettingsController);

export default router;