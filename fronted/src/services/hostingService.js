import api from "./api";

// ========================================
// 🌐 GET MY HOSTING SERVICES
// ========================================
export const getMyHostingAPI =
  async () => {

    try {

      const response =
        await api.get(
          "/hosting/my"
        );

      return response.data;

    } catch (error) {

      throw (
        error?.response?.data || {
          message:
            "Failed to fetch hosting services",
        }
      );

    }
  };

// ========================================
// 🌐 GET SINGLE HOSTING
// ========================================
export const getHostingByIdAPI =
  async (hostingId) => {

    try {

      const response =
        await api.get(
          `/hosting/${hostingId}`
        );

      return response.data;

    } catch (error) {

      throw (
        error?.response?.data || {
          message:
            "Failed to fetch hosting",
        }
      );

    }
  };

// ========================================
// 🚀 CREATE HOSTING ORDER
// ========================================
export const createHostingOrderAPI =
  async (data) => {

    try {

      const response =
        await api.post(
          "/hosting/order",
          data
        );

      return response.data;

    } catch (error) {

      throw (
        error?.response?.data || {
          message:
            "Failed to create hosting order",
        }
      );

    }
  };

// ========================================
// 🔄 RENEW HOSTING
// ========================================
export const renewHostingAPI =
  async (hostingId) => {

    try {

      const response =
        await api.post(
          `/hosting/${hostingId}/renew`
        );

      return response.data;

    } catch (error) {

      throw (
        error?.response?.data || {
          message:
            "Failed to renew hosting",
        }
      );

    }
  };

// ========================================
// ⚙️ MANAGE HOSTING
// ========================================
export const manageHostingAPI =
  async (hostingId) => {

    try {

      const response =
        await api.get(
          `/hosting/${hostingId}/manage`
        );

      return response.data;

    } catch (error) {

      throw (
        error?.response?.data || {
          message:
            "Failed to manage hosting",
        }
      );

    }
  };