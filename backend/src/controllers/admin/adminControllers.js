import User from "../../../models/User.js";
import Order from "../../../models/Order.js";
import Hosting from "../../../models/Hosting.js";
import Domain from "../../../models/Domain.js";
import Payment from "../../../models/Payment.js";
import HostingPlan from "../../../models/HostingPlan.js";
import DomainPricing from "../../../models/DomainPricing.js";
import SiteSettings from "../../../models/SiteSettings.js";
import asyncHandler from "../../../utils/asyncHandler.js";

// ================================
// DASHBOARD STATS
// ================================
export const getDashboardStatsController = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    totalOrders,
    totalHosting,
    totalDomains,
    totalPayments,
    revenueData,
    recentOrders,
    monthlyRevenue,
  ] = await Promise.all([
    User.countDocuments(),
    Order.countDocuments(),
    Hosting.countDocuments({ status: "active" }),
    Domain.countDocuments({ status: "active" }),
    Payment.countDocuments({ status: "paid" }),
    Payment.aggregate([{ $match: { status: "paid" } }, { $group: { _id: null, total: { $sum: "$amount" } } }]),
    Order.find().populate("user", "fullName email").sort({ createdAt: -1 }).limit(5).lean(),
    Payment.aggregate([
      { $match: { status: "paid" } },
      {
        $group: {
          _id: { month: { $month: "$paidAt" }, year: { $year: "$paidAt" } },
          revenue: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 },
    ]),
  ]);

  return res.status(200).json({
    success: true,
    stats: {
      totalUsers,
      totalOrders,
      totalHosting,
      totalDomains,
      totalPayments,
      totalRevenue: revenueData[0]?.total || 0,
    },
    recentOrders,
    monthlyRevenue,
  });
});

// ================================
// USER MANAGEMENT
// ================================
export const getAllUsersController = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const search = req.query.search || "";
  const role = req.query.role || "";

  const query = {};
  if (search) query.$or = [{ fullName: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }];
  if (role) query.role = role;

  const [users, total] = await Promise.all([
    User.find(query).select("-password -refreshToken").sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    User.countDocuments(query),
  ]);

  return res.status(200).json({ success: true, users, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
});

export const getUserByIdController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password -refreshToken").lean();
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  return res.status(200).json({ success: true, user });
});

export const updateUserRoleController = asyncHandler(async (req, res) => {
  const { role } = req.body;
  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({ success: false, message: "Invalid role. Must be 'user' or 'admin'" });
  }
  if (req.params.id === req.user._id.toString()) {
    return res.status(400).json({ success: false, message: "Cannot change your own role" });
  }
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password").lean();
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  return res.status(200).json({ success: true, message: "Role updated", user });
});

export const blockUserController = asyncHandler(async (req, res) => {
  if (req.params.id === req.user._id.toString()) {
    return res.status(400).json({ success: false, message: "Cannot block yourself" });
  }
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  user.isBlocked = !user.isBlocked;
  await user.save({ validateBeforeSave: false });
  return res.status(200).json({ success: true, message: user.isBlocked ? "User blocked" : "User unblocked", isBlocked: user.isBlocked });
});

export const deleteUserController = asyncHandler(async (req, res) => {
  if (req.params.id === req.user._id.toString()) {
    return res.status(400).json({ success: false, message: "Cannot delete yourself" });
  }
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  return res.status(200).json({ success: true, message: "User deleted" });
});

// ================================
// ORDER MANAGEMENT
// ================================
export const getAllOrdersController = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const status = req.query.status || "";

  const query = status ? { orderStatus: status } : {};

  const [orders, total] = await Promise.all([
    Order.find(query).populate("user", "fullName email").sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Order.countDocuments(query),
  ]);

  return res.status(200).json({ success: true, orders, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
});

export const updateOrderStatusController = asyncHandler(async (req, res) => {
  const { orderStatus, paymentStatus } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ success: false, message: "Order not found" });
  if (orderStatus) order.orderStatus = orderStatus;
  if (paymentStatus) { order.paymentStatus = paymentStatus; if (paymentStatus === "paid") order.paidAt = new Date(); }
  await order.save();
  return res.status(200).json({ success: true, message: "Order updated", order });
});

// ================================
// HOSTING MANAGEMENT
// ================================
export const getAllHostingController = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const [hosting, total] = await Promise.all([
    Hosting.find().populate("user", "fullName email").populate("plan", "name").sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Hosting.countDocuments(),
  ]);
  return res.status(200).json({ success: true, hosting, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
});

export const updateHostingStatusController = asyncHandler(async (req, res) => {
  const { status, serverDetails } = req.body;
  const hosting = await Hosting.findById(req.params.id);
  if (!hosting) return res.status(404).json({ success: false, message: "Hosting not found" });
  if (status) hosting.status = status;
  if (serverDetails) hosting.serverDetails = { ...hosting.serverDetails, ...serverDetails };
  await hosting.save();
  return res.status(200).json({ success: true, message: "Hosting updated", hosting });
});

export const getHostingPlansAdminController = asyncHandler(async (req, res) => {
  const plans = await HostingPlan.find().sort({ sortOrder: 1 }).lean();
  return res.status(200).json({ success: true, plans });
});

export const createHostingPlanController = asyncHandler(async (req, res) => {
  const plan = await HostingPlan.create(req.body);
  return res.status(201).json({ success: true, message: "Plan created", plan });
});

export const updateHostingPlanController = asyncHandler(async (req, res) => {
  const plan = await HostingPlan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
  if (!plan) return res.status(404).json({ success: false, message: "Plan not found" });
  return res.status(200).json({ success: true, message: "Plan updated", plan });
});

export const deleteHostingPlanController = asyncHandler(async (req, res) => {
  await HostingPlan.findByIdAndDelete(req.params.id);
  return res.status(200).json({ success: true, message: "Plan deleted" });
});

// ================================
// DOMAIN MANAGEMENT
// ================================
export const getAllDomainsAdminController = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const [domains, total] = await Promise.all([
    Domain.find().populate("user", "fullName email").sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Domain.countDocuments(),
  ]);
  return res.status(200).json({ success: true, domains, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
});

export const getDomainPricingController = asyncHandler(async (req, res) => {
  const pricing = await DomainPricing.find().sort({ extension: 1 }).lean();
  return res.status(200).json({ success: true, pricing });
});

export const updateDomainPricingController = asyncHandler(async (req, res) => {
  const pricing = await DomainPricing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
  if (!pricing) return res.status(404).json({ success: false, message: "Pricing not found" });
  return res.status(200).json({ success: true, message: "Pricing updated", pricing });
});

// ================================
// PAYMENT MANAGEMENT
// ================================
export const getAllPaymentsController = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const [payments, total] = await Promise.all([
    Payment.find().populate("user", "fullName email").populate("order", "orderNumber total").sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Payment.countDocuments(),
  ]);
  return res.status(200).json({ success: true, payments, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
});

// ================================
// SITE SETTINGS
// ================================
export const getSiteSettingsController = asyncHandler(async (req, res) => {
  let settings = await SiteSettings.findOne().lean();
  if (!settings) settings = await SiteSettings.create({});
  return res.status(200).json({ success: true, settings });
});

export const updateSiteSettingsController = asyncHandler(async (req, res) => {
  let settings = await SiteSettings.findOne();
  if (!settings) settings = new SiteSettings();
  Object.assign(settings, req.body);
  await settings.save();
  return res.status(200).json({ success: true, message: "Settings updated", settings });
});