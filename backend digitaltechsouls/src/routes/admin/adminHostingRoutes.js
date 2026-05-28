import express from "express";

const router = express.Router();

// 🔥 CREATE PLAN
router.post(
  "/create-plan",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Hosting Plan Created",
    });
  }
);

// 🔥 GET ALL PLANS
router.get(
  "/plans",
  (req, res) => {
    res.json({
      success: true,
      message:
        "All Hosting Plans",
    });
  }
);

export default router;