import User from "../../../models/User.js";
import Order from "../../../models/Order.js";
import Hosting from "../../../models/Hosting.js";
import Domain from "../../../models/Domain.js";
import Payment from "../../../models/Payment.js";

const getDashboardStatsController =
  async (req, res) => {
    try {
      const totalUsers =
        await User.countDocuments();

      const totalOrders =
        await Order.countDocuments();

      const totalHosting =
        await Hosting.countDocuments();

      const totalDomains =
        await Domain.countDocuments();

      const totalPayments =
        await Payment.countDocuments();

      const revenueData =
        await Payment.aggregate([
          {
            $match: {
              status: "paid",
            },
          },
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: "$amount",
              },
            },
          },
        ]);

      const totalRevenue =
        revenueData[0]?.totalRevenue || 0;

      res.status(200).json({
        success: true,

        stats: {
          totalUsers,
          totalOrders,
          totalHosting,
          totalDomains,
          totalPayments,
          totalRevenue,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch dashboard stats",
        error: error.message,
      });
    }
  };

export default getDashboardStatsController;