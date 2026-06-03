import express from "express";
import {
  createStripePaymentController,
  verifyStripePaymentController,
  createJazzCashPaymentController,
} from "../controllers/payments/paymentControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/stripe/create", createStripePaymentController);
router.post("/stripe/verify", verifyStripePaymentController);
router.post("/jazzcash/create", createJazzCashPaymentController);

export default router;