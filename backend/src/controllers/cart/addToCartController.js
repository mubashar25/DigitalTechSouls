const addToCartController =
  async (req, res) => {
    try {
      res.status(200).json({
        success: true,
        message:
          "Added to cart successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

export default addToCartController;