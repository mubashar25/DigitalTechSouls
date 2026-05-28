import User from "../../../models/User.js";

// ========================================
// 🔥 UPDATE USER ROLE
// ========================================
const updateUserRoleController =
  async (req, res) => {

    try {

      const { userId } = req.params;

      const { role } = req.body;

      // ========================================
      // ❌ VALIDATION
      // ========================================
      if (
        !role ||
        ![
          "user",
          "admin",
        ].includes(role)
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Invalid role",
        });

      }

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
      // 🔥 UPDATE ROLE
      // ========================================
      user.role = role;

      await user.save();

      // ========================================
      // ✅ RESPONSE
      // ========================================
      return res.status(200).json({
        success: true,
        message:
          "User role updated successfully",
        user,
      });

    } catch (error) {

      console.log(
        "Update User Role Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update user role",
      });

    }

  };

export default updateUserRoleController;