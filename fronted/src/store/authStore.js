import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

import {
  loginAPI,
  signupAPI,
  logoutAPI,
  getCurrentUserAPI,
} from "../services/authService";

// ======================================================
// ✅ CONTEXT
// ======================================================

const AuthContext = createContext(null);

// ======================================================
// ✅ SAFE JSON PARSE
// ======================================================

const safeJSONParse = (data) => {
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

// ======================================================
// ✅ PROVIDER
// ======================================================

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAuthenticated = !!user && !!token;

  // ======================================================
  // ✅ LOGOUT
  // ======================================================

  const logout = useCallback(async () => {
    try {
      await logoutAPI();
    } catch (err) {
      console.error("Logout Error:", err);
    } finally {
      setUser(null);
      setToken(null);

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  // ======================================================
  // ✅ LOAD USER
  // ======================================================

  const loadUser = useCallback(async () => {
    try {
      const response = await getCurrentUserAPI();
      const currentUser = response.data.user;

      setUser(currentUser);

      localStorage.setItem("user", JSON.stringify(currentUser));
    } catch (err) {
      console.error("Load User Error:", err);
      logout();
    }
  }, [logout]);

  // ======================================================
  // ✅ LOGIN (FIXED)
  // ======================================================

  const login = useCallback(async (formData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await loginAPI(formData);

      const { user, accessToken } = response.data;

      if (!user || !accessToken) {
        throw new Error("Invalid login response from server");
      }

      setUser(user);
      setToken(accessToken);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accessToken);

      return { success: true, user };
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Login failed";

      setError(message);

      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  // ======================================================
  // ✅ SIGNUP
  // ======================================================

  const signup = useCallback(async (formData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await signupAPI(formData);

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Signup failed";

      setError(message);

      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  // ======================================================
  // ✅ INITIAL AUTH LOAD
  // ======================================================

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");

        const parsedUser = safeJSONParse(savedUser);

        if (parsedUser && savedToken) {
          setUser(parsedUser);
          setToken(savedToken);

          await loadUser();
        } else {
          logout();
        }
      } catch (err) {
        console.error("Auth Init Error:", err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [loadUser, logout]);

  // ======================================================
  // ✅ CONTEXT VALUE
  // ======================================================

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      error,
      isAuthenticated,

      login,
      signup,
      logout,

      userName: user?.name || "User",
      userEmail: user?.email || "",
      role: user?.role || "user",
      isAdmin: user?.role === "admin",
    }),
    [user, token, loading, error, isAuthenticated, login, signup, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ======================================================
// ✅ HOOK
// ======================================================

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used inside AuthProvider"
    );
  }

  return context;
}