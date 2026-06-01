import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🔐 AUTH MIDDLEWARE (CLEAN + SAFE)
const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // ✅ 1. Get token from HttpOnly cookie (preferred)
    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    // ✅ 2. Fallback: Bearer token
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ❌ NO TOKEN
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // ✅ VERIFY TOKEN (safe handling)
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired. Please login again.",
        });
      }

      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    // ✅ FIND USER
    const user = await User.findById(decoded.id).select(
      "-password -refreshToken"
    );

    // ❌ USER NOT FOUND
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Token may be invalid.",
      });
    }

    // ❌ BLOCKED USER CHECK
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked. Contact support.",
      });
    }

    // ✅ ATTACH USER
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    return res.status(500).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};

export default authMiddleware;