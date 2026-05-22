import express from "express";

const router = express.Router();

// 🔥 GET CART
router.get(
  "/",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Get User Cart",
    });
  }
);

// 🔥 ADD TO CART
router.post(
  "/add",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Item Added To Cart",
    });
  }
);

// 🔥 UPDATE CART ITEM
router.put(
  "/update/:id",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Cart Updated",
    });
  }
);

// 🔥 REMOVE ITEM
router.delete(
  "/remove/:id",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Item Removed",
    });
  }
);

// 🔥 CLEAR CART
router.delete(
  "/clear",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Cart Cleared",
    });
  }
);

export default router;