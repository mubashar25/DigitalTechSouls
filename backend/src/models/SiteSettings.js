import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: "DigitalTechSouls" },
    siteTagline: { type: String, default: "Professional Hosting & Domain Services" },
    siteEmail: { type: String, default: "info@digitaltechsouls.com" },
    sitePhone: { type: String, default: "" },
    maintenanceMode: { type: Boolean, default: false },
    taxRate: { type: Number, default: 5 },
    currency: { type: String, default: "USD" },
    supportEmail: { type: String, default: "support@digitaltechsouls.com" },
    socialLinks: {
      facebook: String,
      twitter: String,
      instagram: String,
      linkedin: String,
    },
  },
  { timestamps: true }
);

const SiteSettings = mongoose.model("SiteSettings", siteSettingsSchema);
export default SiteSettings;