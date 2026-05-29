import User from "../../../models/User.js";

// ========================================
// 🗑 DELETE USER
// ========================================
const deleteUserController =
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
      // 🗑 DELETE USER
      // ========================================
      await User.findByIdAndDelete(
        userId
      );

      // ========================================
      // ✅ RESPONSE
      // ========================================
      return res.status(200).json({
        success: true,
        message:
          "User deleted successfully",
      });

    } catch (error) {

      console.log(
        "Delete User Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete user",
      });

    }

  };

export default deleteUserController;