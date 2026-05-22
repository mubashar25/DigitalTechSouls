import Order from "../../../models/Order.js";

const getSalesChartController =
  async (req, res) => {
    try {
      const salesData =
        await Order.aggregate([
          {
            $group: {
              _id: {
                month: {
                  $month:
                    "$createdAt",
                },
              },

              revenue: {
                $sum:
                  "$totalAmount",
              },

              orders: {
                $sum: 1,
              },
            },
          },

          {
            $sort: {
              "_id.month": 1,
            },
          },
        ]);

      res.status(200).json({
        success: true,
        salesData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch sales chart",
        error: error.message,
      });
    }
  };

export default getSalesChartController;