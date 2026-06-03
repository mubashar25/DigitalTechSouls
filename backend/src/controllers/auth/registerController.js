import User from "../../models/User.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { generateAccessToken, generateRefreshToken, setTokenCookies } from "../../utils/generateToken.js";
import { sendVerificationEmail } from "../../services/emailService.js";
import crypto from "crypto";

const registerController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  if (password.length < 8) {
    return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return res.status(400).json({ success: false, message: "Email already registered" });
  }

  const user = await User.create({ fullName: name, email, password });

  // Email verification token
  const verifyToken = user.getEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  // Send verification email (don't block registration if email fails)
  try {
    await sendVerificationEmail(user, verifyToken);
  } catch (err) {
    console.error("Verification email failed:", err.message);
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;
    await user.save({ validateBeforeSave: false });
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Store hashed refresh token
  user.refreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex");
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  setTokenCookies(res, accessToken, refreshToken);

  return res.status(201).json({
    success: true,
    message: "Registration successful. Please verify your email.",
    user: {
      id: user._id,
      name: user.fullName,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    },
  });
});

export default registerController;