const createOrderController =
  async (req, res) => {
    try {
      res.status(201).json({
        success: true,
        message:
          "Order created successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

export default createOrderController;