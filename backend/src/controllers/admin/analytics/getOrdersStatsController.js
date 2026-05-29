import Order from "../../../models/Order.js";

const getOrdersStatsController =
  async (req, res) => {
    try {
      const pendingOrders =
        await Order.countDocuments({
          status: "pending",
        });

      const completedOrders =
        await Order.countDocuments({
          status: "completed",
        });

      const cancelledOrders =
        await Order.countDocuments({
          status: "cancelled",
        });

      res.status(200).json({
        success: true,
        pendingOrders,
        completedOrders,
        cancelledOrders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch orders stats",
        error: error.message,
      });
    }
  };

export default getOrdersStatsController;