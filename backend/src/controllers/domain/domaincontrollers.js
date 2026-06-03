import Domain from "../../models/Domain.js";
import DomainPricing from "../../models/DomainPricing.js";
import asyncHandler from "../../utils/asyncHandler.js";

// ================================
// CHECK DOMAIN AVAILABILITY
// ================================
export const checkDomainController = asyncHandler(async (req, res) => {
  const { domain } = req.query;

  if (!domain) {
    return res.status(400).json({ success: false, message: "Domain name is required" });
  }

  const cleanDomain = domain.trim().toLowerCase();

  // Validate domain format
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
  if (!domainRegex.test(cleanDomain) && !cleanDomain.includes(".")) {
    // User typed just a name without extension - generate suggestions
  }

  const baseName = cleanDomain.includes(".") ? cleanDomain.split(".")[0] : cleanDomain;

  // Get pricing from DB
  const pricingList = await DomainPricing.find({ isActive: true }).lean();

  const results = await Promise.all(
    pricingList.map(async (pricing) => {
      const fullDomain = `${baseName}${pricing.extension}`;
      const existing = await Domain.findOne({ domainName: fullDomain }).lean();

      return {
        domain: fullDomain,
        extension: pricing.extension,
        available: !existing,
        registerPrice: pricing.registerPrice,
        renewalPrice: pricing.renewalPrice,
        transferPrice: pricing.transferPrice,
        featured: pricing.featured,
      };
    })
  );

  return res.status(200).json({ success: true, data: { query: cleanDomain, domains: results } });
});

// ================================
// GET USER DOMAINS
// ================================
export const getMyDomainsController = asyncHandler(async (req, res) => {
  const domains = await Domain.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .lean();

  return res.status(200).json({ success: true, domains });
});

// ================================
// REGISTER DOMAIN
// ================================
export const registerDomainController = asyncHandler(async (req, res) => {
  const { domainName, registrationPeriod = 1, orderId } = req.body;

  if (!domainName) {
    return res.status(400).json({ success: false, message: "Domain name is required" });
  }

  const cleanDomain = domainName.trim().toLowerCase();

  const existing = await Domain.findOne({ domainName: cleanDomain });
  if (existing) {
    return res.status(400).json({ success: false, message: "Domain already registered" });
  }

  const tld = "." + cleanDomain.split(".").slice(1).join(".");
  const pricing = await DomainPricing.findOne({ extension: tld });
  const price = pricing ? pricing.registerPrice * registrationPeriod : 14.99 * registrationPeriod;

  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + registrationPeriod);

  const domain = await Domain.create({
    user: req.user._id,
    domainName: cleanDomain,
    tld,
    type: "register",
    registrationPeriod,
    price,
    status: "active",
    registrationDate: new Date(),
    expiryDate,
    nameservers: ["ns1.digitaltechsouls.com", "ns2.digitaltechsouls.com"],
    order: orderId,
  });

  return res.status(201).json({ success: true, message: "Domain registered successfully", domain });
});

// ================================
// TRANSFER DOMAIN
// ================================
export const transferDomainController = asyncHandler(async (req, res) => {
  const { domainName, authCode, orderId } = req.body;

  if (!domainName || !authCode) {
    return res.status(400).json({ success: false, message: "Domain name and auth code required" });
  }

  const cleanDomain = domainName.trim().toLowerCase();
  const tld = "." + cleanDomain.split(".").slice(1).join(".");
  const pricing = await DomainPricing.findOne({ extension: tld });
  const price = pricing ? pricing.transferPrice : 9.99;

  const domain = await Domain.create({
    user: req.user._id,
    domainName: cleanDomain,
    tld,
    type: "transfer",
    registrationPeriod: 1,
    price,
    status: "pending", // Pending until transfer completes
    nameservers: ["ns1.digitaltechsouls.com", "ns2.digitaltechsouls.com"],
    order: orderId,
  });

  return res.status(201).json({
    success: true,
    message: "Domain transfer initiated. It may take 5-7 days to complete.",
    domain,
  });
});