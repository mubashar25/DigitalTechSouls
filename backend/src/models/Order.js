import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["hosting", "domain"],
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },

    billingCycle: {
      type: String,
      enum: ["monthly", "yearly", null],
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: {
      type: [orderItemSchema],
      validate: {
        validator: (v) => v.length > 0,
        message: "Order must have at least one item",
      },
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    tax: {
      type: Number,
      default: 0,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: ["pending", "processing", "active", "cancelled", "completed"],
      default: "pending",
    },

    invoiceNumber: {
      type: String,
      trim: true,
    },

    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// ✅ FIX: indexes for common query patterns
orderSchema.index({ user: 1, createdAt: -1 }); // "my orders" sorted by newest
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ orderStatus: 1 });

const Order = mongoose.model("Order", orderSchema);

export default Order;