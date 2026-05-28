import express from "express";

import authMiddleware from "../../middleware/authMiddleware.js";
import adminMiddleware from "../../middleware/adminMiddleware.js";

import getAllPaymentsController from "../../controllers/admin/payments/getAllPaymentsController.js";

import getSinglePaymentController from "../../controllers/admin/payments/getSinglePaymentController.js";

import updatePaymentStatusController from "../../controllers/admin/payments/updatePaymentStatusController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| 🔥 ADMIN PAYMENT ROUTES
|--------------------------------------------------------------------------
| Base Route => /api/admin/payments
|--------------------------------------------------------------------------
*/

/**
 * @route   GET /api/admin/payments
 * @desc    Get all payments
 * @access  Private/Admin
 */
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllPaymentsController
);

/**
 * @route   GET /api/admin/payments/:id
 * @desc    Get single payment
 * @access  Private/Admin
 */
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  getSinglePaymentController
);

/**
 * @route   PUT /api/admin/payments/status/:id
 * @desc    Update payment status
 * @access  Private/Admin
 */
router.put(
  "/status/:id",
  authMiddleware,
  adminMiddleware,
  updatePaymentStatusController
);

export default router;