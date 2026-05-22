import mongoose from "mongoose";

const orderItemSchema =
  new mongoose.Schema(
    {
      type: {
        type: String,
        enum: [
          "hosting",
          "domain",
        ],
        required: true,
      },

      name: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      quantity: {
        type: Number,
        default: 1,
      },

      billingCycle: {
        type: String,
      },
    },
    {
      _id: false,
    }
  );

const orderSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      orderItems: [
        orderItemSchema,
      ],

      subtotal: {
        type: Number,
        required: true,
      },

      tax: {
        type: Number,
        default: 0,
      },

      total: {
        type: Number,
        required: true,
      },

      paymentStatus: {
        type: String,
        enum: [
          "pending",
          "paid",
          "failed",
          "refunded",
        ],
        default: "pending",
      },

      orderStatus: {
        type: String,
        enum: [
          "pending",
          "processing",
          "active",
          "cancelled",
          "completed",
        ],
        default: "pending",
      },

      invoiceNumber: {
        type: String,
      },

      paidAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  );

const Order = mongoose.model(
  "Order",
  orderSchema
);

export default Order;