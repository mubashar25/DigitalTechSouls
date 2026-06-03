import express from "express";
import {
  getHostingPlansController,
  getMyHostingController,
  createHostingController,
} from "../controllers/hosting/hostingControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/plans", getHostingPlansController);

// Protected
router.use(authMiddleware);
router.get("/my-hosting", getMyHostingController);
router.post("/create", createHostingController);

export default router;