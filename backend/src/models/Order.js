import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["hosting", "domain"], required: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, default: 1, min: 1 },
    billingCycle: { type: String, enum: ["monthly", "yearly", null] },
    details: { type: mongoose.Schema.Types.Mixed },
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

    orderNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    orderItems: {
      type: [orderItemSchema],
      validate: {
        validator: (v) => v.length > 0,
        message: "Order must have at least one item",
      },
    },

    subtotal: { type: Number, required: true, min: 0 },
    tax: { type: Number, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },

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

    paymentMethod: {
      type: String,
      enum: ["stripe", "jazzcash", "easypaisa", "manual"],
      default: "stripe",
    },

    paymentIntentId: { type: String },
    invoiceNumber: { type: String, trim: true },
    paidAt: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

// Auto-generate order number
orderSchema.pre("save", async function () {
  if (!this.orderNumber) {
    const count = await mongoose.model("Order").countDocuments();
    this.orderNumber = `DTS-${String(count + 1).padStart(6, "0")}`;
  }
});

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ orderNumber: 1 });

const Order = mongoose.model("Order", orderSchema);
export default Order;