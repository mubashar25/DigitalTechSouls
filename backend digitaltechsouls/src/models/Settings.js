import mongoose from "mongoose";

const siteSettingsSchema =
  new mongoose.Schema(
    {
      // 🔥 BASIC
      siteName: {
        type: String,
        default:
          "DigitalTechSouls",
      },

      siteDescription: {
        type: String,
      },

      supportEmail: {
        type: String,
      },

      contactEmail: {
        type: String,
      },

      logo: {
        type: String,
      },

      favicon: {
        type: String,
      },

      // 🔥 WEBSITE
      maintenanceMode: {
        type: Boolean,
        default: false,
      },

      allowRegistrations: {
        type: Boolean,
        default: true,
      },

      currency: {
        type: String,
        default: "USD",
      },

      timezone: {
        type: String,
        default: "UTC",
      },

      // 🔥 SMTP SETTINGS
      smtpHost: {
        type: String,
      },

      smtpPort: {
        type: Number,
      },

      smtpEmail: {
        type: String,
      },

      smtpPassword: {
        type: String,
      },

      smtpFromName: {
        type: String,
      },

      // 🔥 PAYMENT SETTINGS
      stripePublicKey: {
        type: String,
      },

      stripeSecretKey: {
        type: String,
      },

      paypalClientId: {
        type: String,
      },

      paypalSecret: {
        type: String,
      },

      jazzCashMerchantId: {
        type: String,
      },

      jazzCashPassword: {
        type: String,
      },

      easyPaisaStoreId: {
        type: String,
      },

      easyPaisaHashKey: {
        type: String,
      },

      // 🔥 BRANDING
      primaryColor: {
        type: String,
        default: "#2563eb",
      },

      secondaryColor: {
        type: String,
        default: "#0f172a",
      },

      footerText: {
        type: String,
      },

      // 🔥 SEO
      metaTitle: {
        type: String,
      },

      metaDescription: {
        type: String,
      },

      metaKeywords: [
        {
          type: String,
        },
      ],
    },
    {
      timestamps: true,
    }
  );

const SiteSettings =
  mongoose.model(
    "SiteSettings",
    siteSettingsSchema
  );

export default SiteSettings;