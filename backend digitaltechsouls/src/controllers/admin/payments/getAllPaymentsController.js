import Payment from "../../../models/Payment.js";

const getAllPaymentsController =
  async (req, res) => {
    try {
      const payments =
        await Payment.find()
          .populate(
            "user",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        totalPayments:
          payments.length,
        payments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch payments",
        error: error.message,
      });
    }
  };

export default getAllPaymentsController;