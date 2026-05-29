/**
 * =========================================
 * ❌ NOT FOUND MIDDLEWARE
 * =========================================
 */

const notFoundMiddleware = (
  req,
  res,
  next
) => {

  // ========================================
  // 🔥 ROUTE NOT FOUND MESSAGE
  // ========================================
  const errorMessage =
    `Route Not Found - ${req.originalUrl}`;

  // ========================================
  // ❌ RESPONSE
  // ========================================
  return res.status(404).json({
    success: false,

    message:
      errorMessage,
  });

};

export default notFoundMiddleware;