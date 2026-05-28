import User from "../../models/User.js";
import asyncHandler from "../../utils/asyncHandler.js";

const changePasswordController =
  asyncHandler(async (req, res) => {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user = await User.findById(
      req.user._id
    ).select("+password");

    const isMatched =
      await user.matchPassword(
        currentPassword
      );

    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Current password incorrect",
      });
    }

    user.password = newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  });

export default changePasswordController;