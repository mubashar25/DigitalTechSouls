import mongoose from "mongoose";

const hostingPlanSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      slug: {
        type: String,
        required: true,
        unique: true,
      },

      description: {
        type: String,
      },

      priceMonthly: {
        type: Number,
        required: true,
      },

      priceYearly: {
        type: Number,
        required: true,
      },

      storage: {
        type: String,
      },

      bandwidth: {
        type: String,
      },

      websites: {
        type: Number,
      },

      freeSSL: {
        type: Boolean,
        default: true,
      },

      freeDomain: {
        type: Boolean,
        default: false,
      },

      support: {
        type: String,
        default: "24/7 Support",
      },

      features: [
        {
          type: String,
        },
      ],

      popular: {
        type: Boolean,
        default: false,
      },

      status: {
        type: String,
        enum: [
          "active",
          "inactive",
        ],
        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );

const HostingPlan =
  mongoose.model(
    "HostingPlan",
    hostingPlanSchema
  );

export default HostingPlan;