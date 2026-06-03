import express from "express";
import {
  checkDomainController,
  getMyDomainsController,
  registerDomainController,
  transferDomainController,
} from "../controllers/domain/domainControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { domainCheckLimiter } from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

// Public
router.get("/check", domainCheckLimiter, checkDomainController);

// Protected
router.use(authMiddleware);
router.get("/my-domains", getMyDomainsController);
router.post("/register", registerDomainController);
router.post("/transfer", transferDomainController);

export default router;