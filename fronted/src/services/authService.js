import api from "./api";

// ========================================
// 🔐 LOGIN USER
// ========================================
export const loginAPI =
  async ({
    email,
    password,
  }) => {
    try {
      const response =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      return response.data;
    } catch (error) {
      throw (
        error || {
          message:
            "Login failed",
        }
      );
    }
  };

// ========================================
// 📝 REGISTER USER
// ========================================
export const signupAPI =
  async ({
    name,
    email,
    password,
  }) => {
    try {
      const response =
        await api.post(
          "/auth/register",
          {
            name,
            email,
            password,
          }
        );

      return response.data;
    } catch (error) {
      throw (
        error || {
          message:
            "Signup failed",
        }
      );
    }
  };

// ========================================
// 👤 GET CURRENT USER
// ========================================
export const getCurrentUserAPI =
  async () => {
    try {
      const response =
        await api.get(
          "/auth/me"
        );

      return response.data;
    } catch (error) {
      throw (
        error || {
          message:
            "Failed to fetch user",
        }
      );
    }
  };

// ========================================
// 👤 GET PROFILE
// ========================================
export const getProfileAPI =
  async () => {
    try {
      const response =
        await api.get(
          "/users/profile"
        );

      return response.data;
    } catch (error) {
      throw (
        error || {
          message:
            "Failed to fetch profile",
        }
      );
    }
  };

// ========================================
// ✏️ UPDATE PROFILE
// ========================================
export const updateProfileAPI =
  async ({
    name,
    email,
  }) => {
    try {
      const response =
        await api.put(
          "/users/profile",
          {
            name,
            email,
          }
        );

      return response.data;
    } catch (error) {
      throw (
        error || {
          message:
            "Profile update failed",
        }
      );
    }
  };

// ========================================
// 🔑 CHANGE PASSWORD
// ========================================
export const changePasswordAPI =
  async ({
    currentPassword,
    newPassword,
  }) => {
    try {
      const response =
        await api.put(
          "/users/change-password",
          {
            currentPassword,
            newPassword,
          }
        );

      return response.data;
    } catch (error) {
      throw (
        error || {
          message:
            "Password update failed",
        }
      );
    }
  };

// ========================================
// 🚪 LOGOUT USER
// ========================================
export const logoutAPI =
  async () => {
    try {
      const response =
        await api.post(
          "/auth/logout"
        );

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

      return response.data;
    } catch (error) {
      throw (
        error || {
          message:
            "Logout failed",
        }
      );
    }
  };

// ========================================
// 🔑 FORGOT PASSWORD
// ========================================
export const forgotPasswordAPI =
  async (email) => {
    try {
      const response =
        await api.post(
          "/auth/forgot-password",
          { email }
        );

      return response.data;
    } catch (error) {
      throw (
        error || {
          message:
            "Failed to send reset email",
        }
      );
    }
  };

// ========================================
// 🔄 RESET PASSWORD
// ========================================
export const resetPasswordAPI =
  async (
    token,
    password
  ) => {
    try {
      const response =
        await api.post(
          `/auth/reset-password/${token}`,
          {
            password,
          }
        );

      return response.data;
    } catch (error) {
      throw (
        error || {
          message:
            "Password reset failed",
        }
      );
    }
  };

// ========================================
// 📧 VERIFY EMAIL
// ========================================
export const verifyEmailAPI =
  async (token) => {
    try {
      const response =
        await api.get(
          `/auth/verify-email/${token}`
        );

      return response.data;
    } catch (error) {
      throw (
        error || {
          message:
            "Email verification failed",
        }
      );
    }
  };

// ========================================
// 🔄 REFRESH TOKEN
// ========================================
export const refreshTokenAPI =
  async () => {
    try {
      const response =
        await api.post(
          "/auth/refresh-token"
        );

      return response.data;
    } catch (error) {
      throw (
        error || {
          message:
            "Token refresh failed",
        }
      );
    }
  };

// ========================================
// 🖼️ UPLOAD AVATAR
// ========================================
export const uploadAvatarAPI =
  async (formData) => {
    try {
      const response =
        await api.post(
          "/users/upload-avatar",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      return response.data;
    } catch (error) {
      throw (
        error || {
          message:
            "Avatar upload failed",
        }
      );
    }
  };

// ========================================
// ❌ DELETE ACCOUNT
// ========================================
export const deleteAccountAPI =
  async () => {
    try {
      const response =
        await api.delete(
          "/users/delete-account"
        );

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      return response.data;
    } catch (error) {
      throw (
        error || {
          message:
            "Account deletion failed",
        }
      );
    }
  };