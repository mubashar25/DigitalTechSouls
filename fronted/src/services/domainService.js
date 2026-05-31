import api from "./api";

// ========================================
// 🌐 SEARCH DOMAIN
// ========================================
export const searchDomainAPI =
  async (
    query,
    config = {}
  ) => {

    try {

      const response =
        await api.get(
          `/domains/check?domain=${query}`,
          config
        );

      return response.data;

    } catch (error) {

      console.error(
        "Search Domain Error:",
        error
      );

      throw (
        error?.response?.data || {
          message:
            "Failed to search domain",
        }
      );
    }
  };

// ========================================
// 🌍 GET MY DOMAINS
// ========================================
export const getMyDomainsAPI =
  async () => {

    try {

      const response =
        await api.get(
          "/domains/my-domains"
        );

      return response.data;

    } catch (error) {

      throw (
        error?.response?.data || {
          message:
            "Failed to fetch domains",
        }
      );
    }
  };

// ========================================
// 🛒 REGISTER DOMAIN
// ========================================
export const registerDomainAPI =
  async (domainData) => {

    try {

      const response =
        await api.post(
          "/domains/register",
          domainData
        );

      return response.data;

    } catch (error) {

      throw (
        error?.response?.data || {
          message:
            "Failed to register domain",
        }
      );
    }
  };

// ========================================
// 🔄 TRANSFER DOMAIN
// ========================================
export const transferDomainAPI =
  async (domainData) => {

    try {

      const response =
        await api.post(
          "/domains/transfer",
          domainData
        );

      return response.data;

    } catch (error) {

      throw (
        error?.response?.data || {
          message:
            "Failed to transfer domain",
        }
      );
    }
  };