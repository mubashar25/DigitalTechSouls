import asyncHandler from "../../utils/asyncHandler.js";

// 🔥 GET CURRENT USER
const meController = asyncHandler(
  async (req, res) => {

    return res.status(200).json({
      success: true,

      message:
        "Current user fetched successfully",

      user: req.user,
    });
  }
);

export default meController;