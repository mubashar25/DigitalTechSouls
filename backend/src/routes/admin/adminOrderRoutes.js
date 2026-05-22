import express from "express";

import authMiddleware from "../../middleware/authMiddleware.js";
import adminMiddleware from "../../middleware/adminMiddleware.js";

import getAllOrdersController from "../../controllers/admin/orders/getAllOrdersController.js";

import updateOrderStatusController from "../../controllers/admin/orders/updateOrderStatusController.js";

import deleteOrderController from "../../controllers/admin/orders/deleteOrderController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| 🔥 ADMIN ORDER ROUTES
|--------------------------------------------------------------------------
| Base Route => /api/admin/orders
|--------------------------------------------------------------------------
*/

/**
 * @route   GET /api/admin/orders
 * @desc    Get all orders
 * @access  Private/Admin
 */
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllOrdersController
);

/**
 * @route   PUT /api/admin/orders/status/:id
 * @desc    Update order status
 * @access  Private/Admin
 */
router.put(
  "/status/:id",
  authMiddleware,
  adminMiddleware,
  updateOrderStatusController
);

/**
 * @route   DELETE /api/admin/orders/:id
 * @desc    Delete order
 * @access  Private/Admin
 */
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteOrderController
);

export default router;