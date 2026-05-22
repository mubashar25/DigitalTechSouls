import jwt from "jsonwebtoken";

import User from "../models/User.js";

// 🔐 AUTH MIDDLEWARE
const authMiddleware = async (
  req,
  res,
  next
) => {
  try {
    let token;

    // ✅ GET TOKEN FROM HEADER
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {
      token =
        req.headers.authorization.split(
          " "
        )[1];
    }

    // ❌ TOKEN NOT FOUND
    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Access denied. No token provided.",
      });
    }

    // ✅ VERIFY JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ✅ FIND USER
    const user = await User.findById(
      decoded.id
    ).select("-password");

    // ❌ USER NOT FOUND
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // ❌ BLOCKED USER
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message:
          "Your account has been blocked",
      });
    }

    // ✅ SAVE USER IN REQUEST
    req.user = user;

    next();
  } catch (error) {
    console.error(
      "Auth Middleware Error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;