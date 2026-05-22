const generateInvoiceController =
  async (req, res) => {
    try {
      res.status(201).json({
        success: true,
        message:
          "Invoice generated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

export default generateInvoiceController;