import User from "../../models/User.js";
import asyncHandler from "../../utils/asyncHandler.js";

const updateProfileController =
  asyncHandler(async (req, res) => {
    const {
      fullName,
      phone,
      company,
    } = req.body;

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.fullName =
      fullName || user.fullName;

    user.phone = phone || user.phone;

    user.company =
      company || user.company;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated",
      user,
    });
  });

export default updateProfileController;