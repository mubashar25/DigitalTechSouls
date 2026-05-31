import Domain from "../../models/Domain.js";

/**
 * =========================================
 * 🔄 TRANSFER DOMAIN
 * =========================================
 */
const transferDomainController =
  async (req, res) => {

    try {

      const {
        domainName,
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
            "Domain already exists in system",
        });

      }

      // ========================================
      // 🔥 GET TLD
      // ========================================
      const tld =
        "." +
        domainName.split(".").pop();

      // ========================================
      // 📅 EXPIRY DATE
      // ========================================
      const expiryDate =
        new Date();

      expiryDate.setFullYear(
        expiryDate.getFullYear() + 1
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
            "transfer",

          registrationPeriod: 1,

          price: 9.99,

          status:
            "pending",

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
          "Domain transfer initiated",

        data: {
          domain,
        },
      });

    } catch (error) {

      console.log(
        "Transfer Domain Error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to transfer domain",
      });

    }

  };

export default
  transferDomainController;