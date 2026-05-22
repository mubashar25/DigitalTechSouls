import User from "../../models/User.js";

import asyncHandler from "../../utils/asyncHandler.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken.js";

import {
  successResponse,
  errorResponse,
} from "../../utils/formatResponse.js";

const registerController = asyncHandler(
  async (req, res) => {
    const {
      name,
      email,
      password,
    } = req.body;

    //
    // 🔥 VALIDATION
    //
    if (
      !name ||
      !email ||
      !password
    ) {
      return errorResponse(
        res,
        "All fields are required",
        400
      );
    }

    //
    // 🔥 CHECK EXISTING USER
    //
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return errorResponse(
        res,
        "User already exists",
        400
      );
    }

    //
    // 🔥 CREATE USER
    //
    const user = await User.create({
      name,
      email,
      password,
    });

    //
    // 🔥 TOKENS
    //
    const accessToken =
      generateAccessToken(user._id);

    const refreshToken =
      generateRefreshToken(user._id);

    //
    // 🔥 SAVE REFRESH TOKEN
    //
    user.refreshToken =
      refreshToken;

    await user.save();

    //
    // 🔥 COOKIES
    //
    res.cookie(
      "accessToken",
      accessToken,
      {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge:
          15 * 60 * 1000,
      }
    );

    res.cookie(
      "refreshToken",
      refreshToken,
      {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge:
          7 *
          24 *
          60 *
          60 *
          1000,
      }
    );

    //
    // 🔥 RESPONSE
    //
    successResponse(
      res,
      "Registration successful",
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      201
    );
  }
);

export default registerController;