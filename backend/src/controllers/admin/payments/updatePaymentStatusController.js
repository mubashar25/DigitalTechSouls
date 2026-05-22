import Payment from "../../../models/Payment.js";

const updatePaymentStatusController =
  async (req, res) => {
    try {
      const { status } = req.body;

      const payment =
        await Payment.findById(
          req.params.id
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

      payment.status = status;

      await payment.save();

      res.status(200).json({
        success: true,
        message:
          "Payment status updated successfully",
        payment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to update payment status",
        error: error.message,
      });
    }
  };

export default updatePaymentStatusController;