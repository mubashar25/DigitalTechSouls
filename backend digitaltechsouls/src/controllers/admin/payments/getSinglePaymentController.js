import Payment from "../../../models/Payment.js";

const getSinglePaymentController =
  async (req, res) => {
    try {
      const payment =
        await Payment.findById(
          req.params.id
        ).populate(
          "user",
          "name email"
        );

      if (!payment) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Payment not found",
          });
      }

      res.status(200).json({
        success: true,
        payment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch payment",
        error: error.message,
      });
    }
  };

export default getSinglePaymentController;