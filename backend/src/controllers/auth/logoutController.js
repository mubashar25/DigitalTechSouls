import asyncHandler from "../../utils/asyncHandler.js";

// 🔥 LOGOUT USER
const logoutController = asyncHandler(
  async (req, res) => {

    // ✅ CLEAR COOKIE
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res.status(200).json({
      success: true,

      message:
        "Logout successful",
    });
  }
);

export default logoutController;