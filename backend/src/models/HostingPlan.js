import mongoose from "mongoose";

const hostingPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },

    description: { type: String, trim: true },

    monthlyPrice: { type: Number, required: true, min: 0 },
    yearlyPrice: { type: Number, required: true, min: 0 },

    features: {
      storage: { type: String, required: true },      // e.g. "10 GB"
      bandwidth: { type: String, required: true },    // e.g. "Unlimited"
      websites: { type: Number, default: 1 },
      databases: { type: Number, default: 1 },
      emails: { type: Number, default: 5 },
      sslCertificate: { type: Boolean, default: true },
      freeDomain: { type: Boolean, default: false },
      cpanel: { type: Boolean, default: true },
      dailyBackup: { type: Boolean, default: false },
      ddosProtection: { type: Boolean, default: true },
    },

    badge: { type: String, default: "" },       // e.g. "Most Popular"
    isActive: { type: Boolean, default: true },
    isPopular: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const HostingPlan = mongoose.model("HostingPlan", hostingPlanSchema);
export default HostingPlan;