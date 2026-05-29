import api from "./api";

// ========================================
// 🌐 SEARCH DOMAIN
// ========================================
export const searchDomainAPI =
  async (query) => {
    try {

      const response =
        await api.get(
          `/domains/check?domain=${query}`
        );

      return response.data;

    } catch (error) {

      throw (
        error || {
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
        error || {
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
        error || {
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
        error || {
          message:
            "Failed to transfer domain",
        }
      );
    }
  };