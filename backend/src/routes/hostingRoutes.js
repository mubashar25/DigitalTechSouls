import express from "express";

const router = express.Router();

// 🔥 PUBLIC ROUTES
router.get(
  "/plans",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Get Hosting Plans",
    });
  }
);

// 🔥 USER HOSTING
router.get(
  "/my-hosting",
  (req, res) => {
    res.json({
      success: true,
      message:
        "My Hosting",
    });
  }
);

export default router;