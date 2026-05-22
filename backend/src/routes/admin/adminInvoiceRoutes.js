import express from "express";

const router = express.Router();

// 🔥 GET ALL INVOICES
router.get(
  "/",
  (req, res) => {
    res.json({
      success: true,
      message:
        "All Invoices",
    });
  }
);

// 🔥 UPDATE STATUS
router.put(
  "/status/:id",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Invoice Status Updated",
    });
  }
);

// 🔥 DELETE INVOICE
router.delete(
  "/:id",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Invoice Deleted",
    });
  }
);

export default router;