import api from "./api";

// ========================================
// 📄 GET MY INVOICES
// ========================================
export const getMyInvoicesAPI =
  async () => {

    try {

      const response =
        await api.get(
          "/invoices/my"
        );

      return response.data;

    } catch (error) {

      throw (
        error?.response?.data || {
          message:
            "Failed to fetch invoices",
        }
      );

    }
  };

// ========================================
// 📄 GET SINGLE INVOICE
// ========================================
export const getInvoiceByIdAPI =
  async (invoiceId) => {

    try {

      const response =
        await api.get(
          `/invoices/${invoiceId}`
        );

      return response.data;

    } catch (error) {

      throw (
        error?.response?.data || {
          message:
            "Failed to fetch invoice",
        }
      );

    }
  };

// ========================================
// 📥 DOWNLOAD INVOICE PDF
// ========================================
export const downloadInvoiceAPI =
  async (invoiceId) => {

    try {

      const response =
        await api.get(
          `/invoices/${invoiceId}/download`,
          {
            responseType: "blob",
          }
        );

      return response;

    } catch (error) {

      throw (
        error?.response?.data || {
          message:
            "Failed to download invoice",
        }
      );

    }
  };