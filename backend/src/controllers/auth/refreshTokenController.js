import jwt from "jsonwebtoken";

import User from "../../models/User.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken.js";

// ========================================
// 🔐 REFRESH TOKEN CONTROLLER
// ========================================
const refreshTokenController = async (
  req,
  res
) => {

  try {

    // ========================================
    // 🍪 GET REFRESH TOKEN
    // ========================================
    const refreshToken =
      req.cookies?.refreshToken ||
      req.body?.refreshToken;

    // ========================================
    // ❌ NO TOKEN
    // ========================================
    if (!refreshToken) {

      return res.status(401).json({
        success: false,
        message:
          "Refresh token is required",
      });

    }

    // ========================================
    // 🔍 VERIFY TOKEN
    // ========================================
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    // ========================================
    // 👤 FIND USER
    // ========================================
    const user = await User.findById(
      decoded.id
    ).select("-password");

    // ========================================
    // ❌ USER NOT FOUND
    // ========================================
    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    // ========================================
    // 🔥 GENERATE NEW TOKENS
    // ========================================
    const newAccessToken =
      generateAccessToken(user._id);

    const newRefreshToken =
      generateRefreshToken(user._id);

    // ========================================
    // 🍪 SAVE REFRESH TOKEN COOKIE
    // ========================================
    res.cookie(
      "refreshToken",
      newRefreshToken,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "strict",
        maxAge:
          7 * 24 * 60 * 60 * 1000,
      }
    );

    // ========================================
    // ✅ SUCCESS RESPONSE
    // ========================================
    return res.status(200).json({
      success: true,
      message:
        "Token refreshed successfully",

      accessToken:
        newAccessToken,

      refreshToken:
        newRefreshToken,

      user,
    });

  } catch (error) {

    console.log(
      "Refresh Token Error:",
      error
    );

    // ========================================
    // ❌ INVALID TOKEN
    // ========================================
    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired refresh token",
    });

  }

};

export default refreshTokenController;