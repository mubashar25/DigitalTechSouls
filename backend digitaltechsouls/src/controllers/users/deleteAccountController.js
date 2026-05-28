import User from "../../models/User.js";
import asyncHandler from "../../utils/asyncHandler.js";

const deleteAccountController =
  asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(
      req.user._id
    );

    res.status(200).json({
      success: true,
      message: "Account deleted",
    });
  });

export default deleteAccountController;