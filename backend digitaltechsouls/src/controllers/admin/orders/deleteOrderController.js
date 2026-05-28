import Order from "../../../models/Order.js";

const deleteOrderController =
  async (req, res) => {
    try {
      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Order not found",
          });
      }

      await order.deleteOne();

      res.status(200).json({
        success: true,
        message:
          "Order deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to delete order",
        error: error.message,
      });
    }
  };

export default deleteOrderController;