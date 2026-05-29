import User from "../../../models/User.js";

// ========================================
// 🚫 BLOCK / UNBLOCK USER
// ========================================
const blockUserController =
  async (req, res) => {

    try {

      const { userId } =
        req.params;

      // ========================================
      // 🔍 FIND USER
      // ========================================
      const user =
        await User.findById(
          userId
        );

      if (!user) {

        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });

      }

      // ========================================
      // 🔥 TOGGLE BLOCK
      // ========================================
      user.isBlocked =
        !user.isBlocked;

      await user.save();

      // ========================================
      // ✅ RESPONSE
      // ========================================
      return res.status(200).json({
        success: true,
        message:
          user.isBlocked
            ? "User blocked successfully"
            : "User unblocked successfully",

        user,
      });

    } catch (error) {

      console.log(
        "Block User Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update user status",
      });

    }

  };

export default blockUserController;