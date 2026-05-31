import Domain from "../../models/Domain.js";

/**
 * =========================================
 * 🌍 CHECK DOMAIN CONTROLLER
 * =========================================
 */

const checkDomainController =
  async (req, res) => {

    try {

      // ========================================
      // 🔥 GET DOMAIN QUERY
      // ========================================
      const { domain } =
        req.query;

      // ========================================
      // ❌ VALIDATION
      // ========================================
      if (!domain) {

        return res.status(400).json({
          success: false,
          message:
            "Domain query is required",
        });

      }

      // ========================================
      // 🔥 CLEAN DOMAIN
      // ========================================
      const cleanDomain =
        domain
          .trim()
          .toLowerCase();

      // ========================================
      // 🔍 CHECK EXISTING DOMAIN
      // ========================================
      const existingDomain =
        await Domain.findOne({
          domainName:
            cleanDomain,
        });

      // ========================================
      // ❌ DOMAIN TAKEN
      // ========================================
      if (existingDomain) {

        return res.status(200).json({
          success: true,

          data: {
            domains: [
              {
                domain:
                  cleanDomain,

                available:
                  false,

                price: 0,

                message:
                  "Domain already registered",
              },
            ],
          },
        });

      }

      // ========================================
      // ✅ AVAILABLE DOMAIN SUGGESTIONS
      // ========================================
      const extensions = [
        ".com",
        ".net",
        ".org",
        ".store",
        ".io",
      ];

      const domainResults =
        extensions.map(
          (ext, index) => {

            const hasExtension =
              cleanDomain.includes(
                "."
              );

            const fullDomain =
              hasExtension
                ? cleanDomain
                : `${cleanDomain}${ext}`;

            return {
              domain:
                fullDomain,

              available:
                true,

              price:
                10 +
                index * 3,

              registrationPeriod:
                1,
            };

          }
        );

      // ========================================
      // ✅ RESPONSE
      // ========================================
      return res.status(200).json({
        success: true,

        data: {
          domains:
            domainResults,
        },
      });

    } catch (error) {

      console.log(
        "Check Domain Error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to check domain",
      });

    }

  };

export default
  checkDomainController;