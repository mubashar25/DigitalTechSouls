import express from "express";

const router = express.Router();

// 🔥 ALL DOMAINS
router.get(
  "/",
  (req, res) => {
    res.json({
      success: true,
      message:
        "All Domains",
    });
  }
);

// 🔥 APPROVE DOMAIN
router.put(
  "/approve/:id",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Domain Approved",
    });
  }
);

export default router;