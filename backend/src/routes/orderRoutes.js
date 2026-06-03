import express from "express";
import {
  createOrderController,
  getMyOrdersController,
  getSingleOrderController,
  cancelOrderController,
} from "../controllers/orders/orderControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createOrderController);
router.get("/", getMyOrdersController);
router.get("/:id", getSingleOrderController);
router.put("/cancel/:id", cancelOrderController);

export default router;