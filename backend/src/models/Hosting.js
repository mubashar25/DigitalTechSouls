import mongoose from "mongoose";

const hostingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HostingPlan",
      required: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },

    billingCycle: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },

    price: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "active", "suspended", "cancelled", "expired"],
      default: "pending",
    },

    startDate: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true },
    autoRenew: { type: Boolean, default: true },

    // Server details (set by admin)
    serverDetails: {
      hostname: String,
      ipAddress: String,
      cpanelUsername: String,
      serverLocation: String,
    },

    domain: { type: String },
  },
  { timestamps: true }
);

hostingSchema.index({ user: 1 });
hostingSchema.index({ status: 1 });
hostingSchema.index({ expiryDate: 1 });

const Hosting = mongoose.model("Hosting", hostingSchema);
export default Hosting;