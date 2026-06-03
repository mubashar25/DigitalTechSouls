import HostingPlan from "../../models/HostingPlan.js";
import Hosting from "../../models/Hosting.js";
import asyncHandler from "../../utils/asyncHandler.js";

// ================================
// GET HOSTING PLANS (public)
// ================================
export const getHostingPlansController = asyncHandler(async (req, res) => {
  const plans = await HostingPlan.find({ isActive: true })
    .sort({ sortOrder: 1 })
    .lean();

  return res.status(200).json({ success: true, plans });
});

// ================================
// GET MY HOSTING (dashboard)
// ================================
export const getMyHostingController = asyncHandler(async (req, res) => {
  const hostingServices = await Hosting.find({ user: req.user._id })
    .populate("plan", "name features")
    .sort({ createdAt: -1 })
    .lean();

  return res.status(200).json({ success: true, hosting: hostingServices });
});

// ================================
// CREATE HOSTING (after payment)
// ================================
export const createHostingController = asyncHandler(async (req, res) => {
  const { planId, billingCycle, orderId, domain } = req.body;

  if (!planId || !billingCycle || !orderId) {
    return res.status(400).json({ success: false, message: "Plan, billing cycle, and order ID required" });
  }

  const plan = await HostingPlan.findById(planId);
  if (!plan) {
    return res.status(404).json({ success: false, message: "Hosting plan not found" });
  }

  const price = billingCycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;

  const expiryDate = new Date();
  if (billingCycle === "yearly") {
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  } else {
    expiryDate.setMonth(expiryDate.getMonth() + 1);
  }

  const hosting = await Hosting.create({
    user: req.user._id,
    plan: planId,
    order: orderId,
    billingCycle,
    price,
    status: "active",
    startDate: new Date(),
    expiryDate,
    domain,
  });

  await hosting.populate("plan", "name features");

  return res.status(201).json({ success: true, message: "Hosting activated", hosting });
});