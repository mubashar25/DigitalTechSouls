import jwt from "jsonwebtoken";

// ========================================
// 🔐 GENERATE ACCESS TOKEN
// ========================================
export const generateAccessToken = (
  userId
) => {

  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );

};

// ========================================
// 🔐 GENERATE REFRESH TOKEN
// ========================================
export const generateRefreshToken = (
  userId
) => {

  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );

};

// ========================================
// 🔐 DEFAULT TOKEN EXPORT
// (BACKWARD COMPATIBILITY)
// ========================================
const generateToken = (
  userId
) => {

  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

};

export default generateToken;