import User from "../../../models/User.js";

// ========================================
// 👥 GET ALL USERS
// ========================================
const getUsersController = async (
  req,
  res
) => {

  try {

    // ========================================
    // 🔍 FETCH USERS
    // ========================================
    const users = await User.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });

    // ========================================
    // ✅ RESPONSE
    // ========================================
    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });

  } catch (error) {

    console.log(
      "Get Users Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch users",
    });

  }

};

export default getUsersController;