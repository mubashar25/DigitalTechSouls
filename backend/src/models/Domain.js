import mongoose from "mongoose";

const domainSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    domainName: { type: String, required: true, unique: true, lowercase: true, trim: true },
    tld: { type: String, required: true },

    type: {
      type: String,
      enum: ["register", "transfer", "existing"],
      required: true,
    },

    registrationPeriod: { type: Number, default: 1, min: 1, max: 10 },
    price: { type: Number, required: true, min: 0 },

    status: {
      type: String,
      enum: ["pending", "active", "expired", "suspended", "cancelled"],
      default: "pending",
    },

    nameservers: [{ type: String }],

    registrationDate: { type: Date },
    expiryDate: { type: Date },
    autoRenew: { type: Boolean, default: true },
    privacyProtection: { type: Boolean, default: true },

    authCode: { type: String, select: false },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  { timestamps: true }
);

domainSchema.index({ user: 1 });
domainSchema.index({ domainName: 1 }, { unique: true });
domainSchema.index({ expiryDate: 1 });

const Domain = mongoose.model("Domain", domainSchema);
export default Domain;