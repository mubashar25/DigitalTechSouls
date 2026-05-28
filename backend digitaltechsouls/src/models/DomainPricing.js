import mongoose from "mongoose";

const domainPricingSchema =
  new mongoose.Schema(
    {
      extension: {
        type: String,
        required: true,
        unique: true,
      },

      registerPrice: {
        type: Number,
        required: true,
      },

      transferPrice: {
        type: Number,
        required: true,
      },

      renewalPrice: {
        type: Number,
        required: true,
      },

      featured: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

const DomainPricing =
  mongoose.model(
    "DomainPricing",
    domainPricingSchema
  );

export default DomainPricing;