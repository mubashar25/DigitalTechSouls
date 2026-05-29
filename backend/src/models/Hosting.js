import mongoose from "mongoose";

const hostingSchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      hostingPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HostingPlan",
        required: true,
      },

      domain: {
        type: String,
        required: true,
      },

      billingCycle: {
        type: String,
        enum: [
          "monthly",
          "yearly",
        ],
        default: "monthly",
      },

      status: {
        type: String,
        enum: [
          "pending",
          "active",
          "suspended",
          "cancelled",
          "expired",
        ],
        default: "pending",
      },

      startDate: {
        type: Date,
        default: Date.now,
      },

      expiryDate: {
        type: Date,
      },

      autoRenew: {
        type: Boolean,
        default: false,
      },

      serverIP: {
        type: String,
      },

      username: {
        type: String,
      },

      password: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

const Hosting = mongoose.model(
  "Hosting",
  hostingSchema
);

export default Hosting;