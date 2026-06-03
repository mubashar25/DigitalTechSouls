import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // 1. httpOnly cookie (preferred)
    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }
    // 2. Bearer token fallback (for mobile/API clients)
    else if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. Please login." });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ success: false, message: "Token expired.", code: "TOKEN_EXPIRED" });
      }
      return res.status(401).json({ success: false, message: "Invalid token." });
    }

    const user = await User.findById(decoded.id).select("-password -refreshToken").lean();

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found." });
    }

    if (user.isBlocked) {
      return res.status(403).json({ success: false, message: "Account blocked. Contact support." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Authentication failed." });
  }
};

export default authMiddleware;