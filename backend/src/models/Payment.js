import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "usd", uppercase: true },

    method: {
      type: String,
      enum: ["stripe", "jazzcash", "easypaisa", "manual"],
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded", "cancelled"],
      default: "pending",
    },

    // Stripe specific
    stripePaymentIntentId: { type: String },
    stripeChargeId: { type: String },

    // Local payment specific
    transactionId: { type: String },
    transactionRef: { type: String },

    paidAt: { type: Date },
    refundedAt: { type: Date },
    refundReason: { type: String },

    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

paymentSchema.index({ user: 1, createdAt: -1 });
paymentSchema.index({ order: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ stripePaymentIntentId: 1 });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;