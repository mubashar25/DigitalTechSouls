import Order from "../../../models/Order.js";

const getRevenueStatsController =
  async (req, res) => {
    try {
      const orders =
        await Order.find({
          paymentStatus: "paid",
        });

      const totalRevenue =
        orders.reduce(
          (acc, item) =>
            acc + item.totalAmount,
          0
        );

      res.status(200).json({
        success: true,
        totalRevenue,
        totalOrders:
          orders.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch revenue stats",
        error: error.message,
      });
    }
  };

export default getRevenueStatsController;