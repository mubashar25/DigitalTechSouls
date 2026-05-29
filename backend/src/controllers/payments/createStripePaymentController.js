const createStripePaymentController =
  async (req, res) => {
    try {
      res.status(200).json({
        success: true,
        clientSecret:
          "stripe_client_secret",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

export default createStripePaymentController;