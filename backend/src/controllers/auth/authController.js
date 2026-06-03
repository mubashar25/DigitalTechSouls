import User from "../../models/User.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { generateAccessToken, generateRefreshToken, setTokenCookies, clearTokenCookies } from "../../utils/generateToken.js";
import { sendVerificationEmail, sendPasswordResetEmail } from "../../services/emailService.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// ================================
// LOGOUT
// ================================
export const logoutController = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (token) {
    const user = await User.findOne({
      refreshToken: crypto.createHash("sha256").update(token).digest("hex"),
    });
    if (user) {
      user.refreshToken = null;
      await user.save({ validateBeforeSave: false });
    }
  }

  clearTokenCookies(res);
  return res.status(200).json({ success: true, message: "Logged out successfully" });
});

// ================================
// ME (current user)
// ================================
export const meController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).lean();
  return res.status(200).json({ success: true, user });
});

// ================================
// REFRESH TOKEN
// ================================
export const refreshTokenController = asyncHandler(async (req, res) => {
  const incomingToken = req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingToken) {
    return res.status(401).json({ success: false, message: "Refresh token required" });
  }

  let decoded;
  try {
    decoded = jwt.verify(incomingToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired refresh token" });
  }

  const hashedToken = crypto.createHash("sha256").update(incomingToken).digest("hex");
  const user = await User.findOne({ _id: decoded.id, refreshToken: hashedToken }).select("-password");

  if (!user) {
    return res.status(401).json({ success: false, message: "Token revoked or user not found" });
  }

  const newAccessToken = generateAccessToken(user._id);
  const newRefreshToken = generateRefreshToken(user._id);

  user.refreshToken = crypto.createHash("sha256").update(newRefreshToken).digest("hex");
  await user.save({ validateBeforeSave: false });

  setTokenCookies(res, newAccessToken, newRefreshToken);

  return res.status(200).json({
    success: true,
    message: "Token refreshed",
    user: { id: user._id, name: user.fullName, email: user.email, role: user.role },
  });
});

// ================================
// VERIFY EMAIL
// ================================
export const verifyEmailController = asyncHandler(async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ success: false, message: "Verification token required" });
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ success: false, message: "Invalid or expired verification link" });
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json({ success: true, message: "Email verified successfully. You can now login." });
});

// ================================
// FORGOT PASSWORD
// ================================
export const forgotPasswordController = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  // Always return success to prevent email enumeration
  if (!user) {
    return res.status(200).json({ success: true, message: "If that email exists, a reset link has been sent." });
  }

  const resetToken = user.getPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    await sendPasswordResetEmail(user, resetToken);
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(500).json({ success: false, message: "Email could not be sent. Try again later." });
  }

  return res.status(200).json({ success: true, message: "Password reset link sent to your email." });
});

// ================================
// RESET PASSWORD
// ================================
export const resetPasswordController = asyncHandler(async (req, res) => {
  const { token } = req.query;
  const { password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ success: false, message: "Token and new password are required" });
  }

  if (password.length < 8) {
    return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ success: false, message: "Invalid or expired reset link" });
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpiry = undefined;
  user.refreshToken = null; // Invalidate all sessions
  await user.save();

  clearTokenCookies(res);
  return res.status(200).json({ success: true, message: "Password reset successfully. Please login." });
});