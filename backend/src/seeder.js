import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import HostingPlan from "../models/HostingPlan.js";
import DomainPricing from "../models/DomainPricing.js";
import User from "../models/User.js";

const hostingPlans = [
  {
    name: "Starter",
    slug: "starter",
    description: "Perfect for beginners and small websites",
    monthlyPrice: 2.99,
    yearlyPrice: 23.88,
    features: { storage: "10 GB", bandwidth: "100 GB", websites: 1, databases: 1, emails: 5, sslCertificate: true, freeDomain: false, cpanel: true, dailyBackup: false, ddosProtection: true },
    sortOrder: 1,
  },
  {
    name: "Business",
    slug: "business",
    description: "Great for growing businesses",
    monthlyPrice: 5.99,
    yearlyPrice: 47.88,
    features: { storage: "50 GB", bandwidth: "Unlimited", websites: 5, databases: 10, emails: 25, sslCertificate: true, freeDomain: true, cpanel: true, dailyBackup: true, ddosProtection: true },
    badge: "Most Popular",
    isPopular: true,
    sortOrder: 2,
  },
  {
    name: "Professional",
    slug: "professional",
    description: "For high-traffic and demanding applications",
    monthlyPrice: 9.99,
    yearlyPrice: 83.88,
    features: { storage: "200 GB", bandwidth: "Unlimited", websites: 20, databases: 30, emails: 100, sslCertificate: true, freeDomain: true, cpanel: true, dailyBackup: true, ddosProtection: true },
    badge: "Best Value",
    sortOrder: 3,
  },
  {
    name: "Enterprise",
    slug: "enterprise",
    description: "Maximum power for enterprise needs",
    monthlyPrice: 19.99,
    yearlyPrice: 167.88,
    features: { storage: "500 GB", bandwidth: "Unlimited", websites: 100, databases: 100, emails: 500, sslCertificate: true, freeDomain: true, cpanel: true, dailyBackup: true, ddosProtection: true },
    sortOrder: 4,
  },
];

const domainPricing = [
  { extension: ".com", registerPrice: 12.99, transferPrice: 9.99, renewalPrice: 14.99, featured: true },
  { extension: ".net", registerPrice: 10.99, transferPrice: 8.99, renewalPrice: 12.99, featured: true },
  { extension: ".org", registerPrice: 9.99, transferPrice: 7.99, renewalPrice: 11.99, featured: true },
  { extension: ".pk", registerPrice: 5.99, transferPrice: 4.99, renewalPrice: 6.99, featured: true },
  { extension: ".co", registerPrice: 15.99, transferPrice: 12.99, renewalPrice: 17.99, featured: false },
  { extension: ".io", registerPrice: 39.99, transferPrice: 34.99, renewalPrice: 42.99, featured: false },
  { extension: ".store", registerPrice: 2.99, transferPrice: 2.99, renewalPrice: 29.99, featured: false },
  { extension: ".info", registerPrice: 3.99, transferPrice: 3.99, renewalPrice: 9.99, featured: false },
  { extension: ".online", registerPrice: 1.99, transferPrice: 1.99, renewalPrice: 19.99, featured: false },
  { extension: ".tech", registerPrice: 4.99, transferPrice: 4.99, renewalPrice: 29.99, featured: false },
];

const seedDB = async () => {
  try {
    await connectDB();

    console.log("🌱 Seeding database...");

    // Clear existing
    await HostingPlan.deleteMany({});
    await DomainPricing.deleteMany({});

    // Insert fresh
    await HostingPlan.insertMany(hostingPlans);
    console.log("✅ Hosting plans seeded");

    await DomainPricing.insertMany(domainPricing);
    console.log("✅ Domain pricing seeded");

    // Create admin user if not exists
    const adminExists = await User.findOne({ role: "admin" });
    if (!adminExists) {
      await User.create({
        fullName: "Admin",
        email: process.env.ADMIN_EMAIL || "admin@digitaltechsouls.com",
        password: process.env.ADMIN_PASSWORD || "Admin@123456",
        role: "admin",
        isVerified: true,
      });
      console.log("✅ Admin user created");
      console.log(`   Email: ${process.env.ADMIN_EMAIL || "admin@digitaltechsouls.com"}`);
      console.log(`   Password: ${process.env.ADMIN_PASSWORD || "Admin@123456"}`);
    }

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDB();