import Stripe from "stripe";
import Order from "../../models/Order.js";
import Payment from "../../models/Payment.js";
import asyncHandler from "../../utils/asyncHandler.js";

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

// ================================
// CREATE STRIPE PAYMENT INTENT
// ================================
export const createStripePaymentController = asyncHandler(async (req, res) => {
  const { orderId, amount, currency = "usd" } = req.body;

  if (!orderId || !amount) {
    return res.status(400).json({ success: false, message: "Order ID and amount are required" });
  }

  const order = await Order.findOne({ _id: orderId, user: req.user._id });

  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  if (order.paymentStatus === "paid") {
    return res.status(400).json({ success: false, message: "Order already paid" });
  }

  const stripe = getStripe();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency: currency.toLowerCase(),
    metadata: {
      orderId: orderId.toString(),
      userId: req.user._id.toString(),
      orderNumber: order.orderNumber,
    },
  });

  // Save payment record
  await Payment.create({
    user: req.user._id,
    order: orderId,
    amount,
    currency: currency.toUpperCase(),
    method: "stripe",
    status: "pending",
    stripePaymentIntentId: paymentIntent.id,
  });

  // Update order with payment intent
  order.paymentIntentId = paymentIntent.id;
  await order.save();

  return res.status(200).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  });
});

// ================================
// VERIFY STRIPE PAYMENT
// ================================
export const verifyStripePaymentController = asyncHandler(async (req, res) => {
  const { paymentIntentId } = req.body;

  if (!paymentIntentId) {
    return res.status(400).json({ success: false, message: "Payment intent ID required" });
  }

  const stripe = getStripe();
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (paymentIntent.status !== "succeeded") {
    return res.status(400).json({ success: false, message: "Payment not completed" });
  }

  const orderId = paymentIntent.metadata.orderId;

  // Update payment
  const payment = await Payment.findOne({ stripePaymentIntentId: paymentIntentId });
  if (payment) {
    payment.status = "paid";
    payment.paidAt = new Date();
    await payment.save();
  }

  // Update order
  const order = await Order.findById(orderId);
  if (order) {
    order.paymentStatus = "paid";
    order.orderStatus = "processing";
    order.paidAt = new Date();
    await order.save();
  }

  return res.status(200).json({ success: true, message: "Payment verified successfully", order });
});

// ================================
// JAZZCASH PAYMENT (Pakistan)
// ================================
export const createJazzCashPaymentController = asyncHandler(async (req, res) => {
  const { orderId, amount, mobileNumber } = req.body;

  if (!orderId || !amount || !mobileNumber) {
    return res.status(400).json({ success: false, message: "Order ID, amount, and mobile number required" });
  }

  // JazzCash integration placeholder
  // In production: integrate with JazzCash REST API using HMAC authentication
  const transactionRef = `JC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  await Payment.create({
    user: req.user._id,
    order: orderId,
    amount,
    currency: "PKR",
    method: "jazzcash",
    status: "pending",
    transactionRef,
    metadata: { mobileNumber },
  });

  return res.status(200).json({
    success: true,
    message: "JazzCash payment initiated",
    transactionRef,
    // In production: return JazzCash redirect URL or payment form data
    redirectUrl: `${process.env.FRONTEND_URL}/checkout/jazzcash?ref=${transactionRef}`,
  });
});