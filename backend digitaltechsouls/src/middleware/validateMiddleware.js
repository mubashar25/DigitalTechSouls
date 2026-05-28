/**
 * =========================================
 * ✅ VALIDATION MIDDLEWARE
 * =========================================
 */

const validateMiddleware = (
  requiredFields = []
) => {

  return (
    req,
    res,
    next
  ) => {

    try {

      // ========================================
      // 🔥 CHECK MISSING FIELDS
      // ========================================
      const missingFields =
        requiredFields.filter(
          (field) => {

            const value =
              req.body?.[field];

            return (
              value === undefined ||
              value === null ||
              value === ""
            );

          }
        );

      // ========================================
      // ❌ VALIDATION FAILED
      // ========================================
      if (
        missingFields.length > 0
      ) {

        return res.status(400).json({
          success: false,

          message:
            "Validation failed",

          missingFields,
        });

      }

      // ========================================
      // ✅ NEXT
      // ========================================
      next();

    } catch (error) {

      console.log(
        "Validation Middleware Error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Validation middleware failed",
      });

    }

  };

};

export default validateMiddleware;