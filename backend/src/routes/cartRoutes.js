import express from "express";
import {
  getCartController,
  addToCartController,
  removeFromCartController,
  clearCartController,
} from "../controllers/cart/cartControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getCartController);
router.post("/add", addToCartController);
router.delete("/remove/:itemName", removeFromCartController);
router.delete("/clear", clearCartController);

export default router;