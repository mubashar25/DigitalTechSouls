import express from "express";

const router = express.Router();

// 🔥 CHECK DOMAIN
router.get(
  "/check",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Domain Check API",
    });
  }
);

// 🔥 REGISTER DOMAIN
router.post(
  "/register",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Register Domain",
    });
  }
);

// 🔥 TRANSFER DOMAIN
router.post(
  "/transfer",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Transfer Domain",
    });
  }
);

// 🔥 WHOIS
router.get(
  "/whois/:domain",
  (req, res) => {
    res.json({
      success: true,
      message:
        "WHOIS Lookup",
    });
  }
);

export default router;