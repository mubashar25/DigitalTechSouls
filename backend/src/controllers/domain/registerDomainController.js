import Domain from "../../models/Domain.js";

/**
 * =========================================
 * 🌍 REGISTER DOMAIN
 * =========================================
 */
const registerDomainController =
  async (req, res) => {

    try {

      const {
        domainName,
        registrationPeriod = 1,
      } = req.body;

      // ========================================
      // ❌ VALIDATION
      // ========================================
      if (!domainName) {

        return res.status(400).json({
          success: false,

          message:
            "Domain name is required",
        });

      }

      // ========================================
      // 🔥 CHECK EXISTING
      // ========================================
      const existing =
        await Domain.findOne({
          domainName,
        });

      if (existing) {

        return res.status(400).json({
          success: false,

          message:
            "Domain already registered",
        });

      }

      // ========================================
      // 🔥 GET TLD
      // ========================================
      const tld =
        "." +
        domainName.split(".").pop();

      // ========================================
      // 💰 PRICE
      // ========================================
      const price =
        tld === ".com"
          ? 14.99
          : tld === ".net"
          ? 12.99
          : 11.99;

      // ========================================
      // 📅 EXPIRY DATE
      // ========================================
      const expiryDate =
        new Date();

      expiryDate.setFullYear(
        expiryDate.getFullYear() +
          registrationPeriod
      );

      // ========================================
      // 🔥 CREATE DOMAIN
      // ========================================
      const domain =
        await Domain.create({

          user:
            req.user.id,

          domainName,

          tld,

          type:
            "register",

          registrationPeriod,

          price,

          status:
            "active",

          expiryDate,

          nameservers: [
            "ns1.digitaltechsouls.com",
            "ns2.digitaltechsouls.com",
          ],

        });

      // ========================================
      // ✅ RESPONSE
      // ========================================
      return res.status(201).json({
        success: true,

        message:
          "Domain registered successfully",

        data: {
          domain,
        },
      });

    } catch (error) {

      console.log(
        "Register Domain Error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to register domain",
      });

    }

  };

export default
  registerDomainController;