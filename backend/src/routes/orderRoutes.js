import express from "express";

const router = express.Router();

// 🔥 CREATE ORDER
router.post(
  "/create",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Order Created Successfully",
    });
  }
);

// 🔥 MY ORDERS
router.get(
  "/my-orders",
  (req, res) => {
    res.json({
      success: true,
      message:
        "User Orders",
    });
  }
);

// 🔥 SINGLE ORDER
router.get(
  "/:id",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Single Order",
    });
  }
);

// 🔥 CANCEL ORDER
router.put(
  "/cancel/:id",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Order Cancelled",
    });
  }
);

export default router;