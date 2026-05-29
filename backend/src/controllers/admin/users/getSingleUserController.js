import User from "../../../models/User.js";

// ========================================
// 👤 GET SINGLE USER
// ========================================
const getSingleUserController =
  async (req, res) => {

    try {

      const { userId } = req.params;

      // ========================================
      // 🔍 FIND USER
      // ========================================
      const user =
        await User.findById(
          userId
        ).select("-password");

      // ========================================
      // ❌ USER NOT FOUND
      // ========================================
      if (!user) {

        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });

      }

      // ========================================
      // ✅ RESPONSE
      // ========================================
      return res.status(200).json({
        success: true,
        user,
      });

    } catch (error) {

      console.log(
        "Get Single User Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch user",
      });

    }

  };

export default getSingleUserController;