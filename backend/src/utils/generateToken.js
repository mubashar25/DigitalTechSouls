import jwt from "jsonwebtoken";

//
// 🔥 ACCESS TOKEN
//
export const generateAccessToken = (
  userId
) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

//
// 🔥 REFRESH TOKEN
//
export const generateRefreshToken = (
  userId
) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
};