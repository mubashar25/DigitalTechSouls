import User from "../../models/User.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { generateAccessToken, generateRefreshToken, setTokenCookies } from "../../utils/generateToken.js";
import crypto from "crypto";

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  if (user.isBlocked) {
    return res.status(403).json({ success: false, message: "Account blocked. Contact support." });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Store hashed refresh token
  user.refreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex");
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  // Set httpOnly cookies (NOT in response body)
  setTokenCookies(res, accessToken, refreshToken);

  return res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: user._id,
      name: user.fullName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      isVerified: user.isVerified,
    },
  });
});

export default loginController;