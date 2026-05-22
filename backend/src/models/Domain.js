import mongoose from "mongoose";

const domainSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      domainName: {
        type: String,
        required: true,
        unique: true,
      },

      tld: {
        type: String,
        required: true,
      },

      type: {
        type: String,
        enum: [
          "register",
          "transfer",
          "existing",
        ],
        required: true,
      },

      registrationPeriod: {
        type: Number,
        default: 1,
      },

      price: {
        type: Number,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "pending",
          "active",
          "expired",
          "suspended",
          "cancelled",
        ],
        default: "pending",
      },

      nameservers: [
        {
          type: String,
        },
      ],

      expiryDate: {
        type: Date,
      },

      autoRenew: {
        type: Boolean,
        default: false,
      },

      privacyProtection: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

const Domain =
  mongoose.model(
    "Domain",
    domainSchema
  );

export default Domain;