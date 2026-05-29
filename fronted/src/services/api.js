import axios from "axios";

// 🌍 BASE URL
const BASE_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000/api";

// 🔥 AXIOS INSTANCE
const api = axios.create({
  baseURL: BASE_URL,

  timeout: 15000,

  withCredentials: true,

  headers: {
    "Content-Type":
      "application/json",
  },
});

// =========================================
// 🔐 REQUEST INTERCEPTOR
// =========================================
api.interceptors.request.use(
  (config) => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      // 🔥 ATTACH TOKEN
      if (token) {
        config.headers.Authorization =
          `Bearer ${token}`;
      }
    } catch (error) {
      console.error(
        "Token Read Error:",
        error
      );
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// =========================================
// ⚠️ RESPONSE INTERCEPTOR
// =========================================
api.interceptors.response.use(
  // ✅ SUCCESS
  (response) => response,

  // ❌ ERROR
  async (error) => {
    const status =
      error.response?.status;

    const message =
      error.response?.data
        ?.message ||
      error.message ||
      "Something went wrong";

    console.error(
      "API Error:",
      message
    );

    // =========================================
    // 🔒 AUTO LOGOUT ON 401
    // =========================================
    if (status === 401) {
      try {
        // 🧹 CLEAR STORAGE
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        localStorage.removeItem(
          "cart"
        );

        // 🔥 REDIRECT
        window.location.href =
          "/login";
      } catch (cleanupError) {
        console.error(
          "Logout Cleanup Error:",
          cleanupError
        );
      }
    }

    // =========================================
    // 🔥 RETURN CLEAN ERROR
    // =========================================
    return Promise.reject({
      success: false,

      status,

      message,

      data:
        error.response?.data,

      originalError: error,
    });
  }
);

export default api;