import bcrypt from "bcryptjs";
import User from "../../models/User.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken.js";

// 🔐 LOGIN CONTROLLER
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ VALIDATION
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // ✅ FIND USER (IMPORTANT: include password)
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ❌ BLOCKED USER
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked",
      });
    }

    // ✅ CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ✅ TOKENS (FIXED)
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // (optional) save refresh token if you use it
    user.refreshToken = refreshToken;
    await user.save();

    // ✅ RESPONSE
    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.fullName, // IMPORTANT FIX (not user.name)
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });

  } catch (error) {
    console.error("Login Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

export default loginController;