import Order from "../../models/Order.js";
import Cart from "../../models/Cart.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendOrderConfirmationEmail } from "../../services/emailService.js";

// ================================
// CREATE ORDER
// ================================
export const createOrderController = asyncHandler(async (req, res) => {
  const { orderItems, subtotal, tax, total, paymentMethod = "stripe" } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ success: false, message: "No items in order" });
  }

  if (!total || total <= 0) {
    return res.status(400).json({ success: false, message: "Invalid order total" });
  }

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    subtotal,
    tax: tax || 0,
    total,
    paymentMethod,
    paymentStatus: "pending",
    orderStatus: "pending",
  });

  // Clear user's cart after order
  await Cart.findOneAndDelete({ user: req.user._id });

  // Send confirmation email (non-blocking)
  try {
    await sendOrderConfirmationEmail(req.user, order);
  } catch (err) {
    console.error("Order email failed:", err.message);
  }

  return res.status(201).json({ success: true, message: "Order created successfully", order });
});

// ================================
// GET MY ORDERS
// ================================
export const getMyOrdersController = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [orders, total] = await Promise.all([
    Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Order.countDocuments({ user: req.user._id }),
  ]);

  return res.status(200).json({
    success: true,
    orders,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// ================================
// GET SINGLE ORDER
// ================================
export const getSingleOrderController = asyncHandler(async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).lean();

  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  return res.status(200).json({ success: true, order });
});

// ================================
// CANCEL ORDER
// ================================
export const cancelOrderController = asyncHandler(async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  if (!["pending", "processing"].includes(order.orderStatus)) {
    return res.status(400).json({ success: false, message: "Order cannot be cancelled at this stage" });
  }

  order.orderStatus = "cancelled";
  order.paymentStatus = order.paymentStatus === "paid" ? "refunded" : order.paymentStatus;
  await order.save();

  return res.status(200).json({ success: true, message: "Order cancelled successfully", order });
});