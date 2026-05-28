/**
 * =========================================
 * 🚨 GLOBAL ERROR HANDLER MIDDLEWARE
 * =========================================
 */

const errorMiddleware = (
  err,
  req,
  res,
  next
) => {

  // ========================================
  // 🔥 DEFAULT ERROR VALUES
  // ========================================
  let statusCode =
    err.statusCode || 500;

  let message =
    err.message ||
    "Internal Server Error";

  // ========================================
  // 🔥 MONGOOSE INVALID OBJECT ID
  // ========================================
  if (err.name === "CastError") {

    statusCode = 400;

    message =
      "Invalid resource ID";

  }

  // ========================================
  // 🔥 MONGOOSE DUPLICATE KEY
  // ========================================
  if (err.code === 11000) {

    statusCode = 400;

    const field =
      Object.keys(
        err.keyValue
      )[0];

    message =
      `${field} already exists`;

  }

  // ========================================
  // 🔥 MONGOOSE VALIDATION ERROR
  // ========================================
  if (
    err.name ===
    "ValidationError"
  ) {

    statusCode = 400;

    message = Object.values(
      err.errors
    )
      .map(
        (val) =>
          val.message
      )
      .join(", ");

  }

  // ========================================
  // 🔥 JWT INVALID TOKEN
  // ========================================
  if (
    err.name ===
    "JsonWebTokenError"
  ) {

    statusCode = 401;

    message =
      "Invalid authentication token";

  }

  // ========================================
  // 🔥 JWT TOKEN EXPIRED
  // ========================================
  if (
    err.name ===
    "TokenExpiredError"
  ) {

    statusCode = 401;

    message =
      "Authentication token expired";

  }

  // ========================================
  // 🔥 DEVELOPMENT LOG
  // ========================================
  console.log(
    "\n🚨 ERROR MIDDLEWARE"
  );

  console.log(
    "Status:",
    statusCode
  );

  console.log(
    "Message:",
    message
  );

  console.log(
    "Stack:",
    err.stack
  );

  // ========================================
  // ✅ RESPONSE
  // ========================================
  return res.status(
    statusCode
  ).json({
    success: false,

    message,

    stack:
      process.env
        .NODE_ENV ===
      "development"
        ? err.stack
        : null,
  });

};

export default errorMiddleware;