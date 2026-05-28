import mongoose from "mongoose";

const paymentSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      order: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },

      paymentMethod: {
        type: String,
        enum: [
          "stripe",
          "paypal",
          "jazzcash",
          "easypaisa",
        ],
        required: true,
      },

      transactionId: {
        type: String,
      },

      amount: {
        type: Number,
        required: true,
      },

      currency: {
        type: String,
        default: "USD",
      },

      status: {
        type: String,
        enum: [
          "pending",
          "paid",
          "failed",
          "refunded",
        ],
        default: "pending",
      },

      paidAt: {
        type: Date,
      },

      refundedAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  );

const Payment =
  mongoose.model(
    "Payment",
    paymentSchema
  );

export default Payment;