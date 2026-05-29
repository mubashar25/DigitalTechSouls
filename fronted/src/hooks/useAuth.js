import { useMemo } from "react";

import { useAuthContext }
  from "../store/authStore";

export default function useAuth() {

  const auth =
    useAuthContext();

  const {

    // 👤 USER
    user,

    // 🔐 TOKEN
    token,

    // 🔐 AUTH
    login,
    signup,
    logout,

    // 🔄 STATES
    loading,
    error,

    // 🔐 STATUS
    isAuthenticated,

  } = auth || {};

  return useMemo(() => {

    const safeUser =
      user || {};

    return {

      // 👤 USER
      user,

      // 🔐 TOKEN
      token,

      // 🔐 AUTH METHODS
      login,
      signup,
      logout,

      // 🔄 STATES
      loading:
        !!loading,

      error:
        error || "",

      // 🔐 AUTH STATE
      isAuthenticated:
        !!isAuthenticated,

      isLoggedIn:
        !!isAuthenticated,

      isLoggedOut:
        !isAuthenticated,

      // 🧠 USER HELPERS
      userName:
        safeUser.name || "User",

      userEmail:
        safeUser.email || "",

      userAvatar:
        safeUser.avatar || "",

      // 🛡 ROLE HELPERS
      role:
        safeUser.role || "user",

      isAdmin:
        safeUser.role === "admin",

      isUser:
        safeUser.role === "user",

      // 🧠 EXTRA FLAGS
      isVerified:
        safeUser.isVerified || false,

      isBlocked:
        safeUser.isBlocked || false,
    };

  }, [
    user,
    token,
    login,
    signup,
    logout,
    loading,
    error,
    isAuthenticated,
  ]);
}