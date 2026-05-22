import User from "../../models/User.js";
import asyncHandler from "../../utils/asyncHandler.js";

const getProfileController = asyncHandler(
  async (req, res) => {
    const user = await User.findById(
      req.user._id
    );

    res.status(200).json({
      success: true,
      user,
    });
  }
);

export default getProfileController;