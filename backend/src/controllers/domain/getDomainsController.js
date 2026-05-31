import Domain from "../../models/Domain.js";

/**
 * =========================================
 * 🌍 GET MY DOMAINS
 * =========================================
 */
const getDomainsController =
  async (req, res) => {

    try {

      // ========================================
      // 🔥 GET USER DOMAINS
      // ========================================
      const domains =
        await Domain.find({
          user: req.user.id,
        }).sort({
          createdAt: -1,
        });

      // ========================================
      // ✅ RESPONSE
      // ========================================
      return res.status(200).json({
        success: true,

        data: {
          domains,
        },
      });

    } catch (error) {

      console.log(
        "Get Domains Error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to fetch domains",
      });

    }

  };

export default
  getDomainsController;