const forgotPasswordController = async (
  req,
  res
) => {

  try {

    const { email } = req.body;

    // ==============================
    // 🔥 VALIDATION
    // ==============================
    if (!email) {

      return res.status(400).json({
        success: false,
        message: "Email is required",
      });

    }

    // ==============================
    // 🔥 RESPONSE
    // ==============================
    return res.status(200).json({
      success: true,
      message:
        "Password reset link sent successfully",
    });

  } catch (error) {

    console.log(
      "Forgot Password Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to process forgot password request",
    });

  }

};

export default forgotPasswordController;