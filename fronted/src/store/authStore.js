import { create } from "zustand";
import api from "../services/api.js";

const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,
  isInitialized: false,

  // ================================
  // REGISTER
  // ================================
  register: async (name, email, password) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post("/auth/register", { name, email, password });
      set({ user: data.user, isLoading: false });
      return { success: true };
    } catch (err) {
      set({ isLoading: false });
      return { success: false, message: err.response?.data?.message || "Registration failed" };
    }
  },

  // ================================
  // LOGIN
  // ================================
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post("/auth/login", { email, password });
      // Token is in httpOnly cookie — NOT stored here
      set({ user: data.user, isLoading: false });
      return { success: true, user: data.user };
    } catch (err) {
      set({ isLoading: false });
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  },

  // ================================
  // LOGOUT
  // ================================
  logout: async () => {
    try { await api.post("/auth/logout"); } catch (_) {}
    set({ user: null });
  },

  // ================================
  // GET CURRENT USER (on app load)
  // ================================
  fetchMe: async () => {
    try {
      const { data } = await api.get("/auth/me");
      set({ user: data.user, isInitialized: true });
    } catch {
      set({ user: null, isInitialized: true });
    }
  },

  // ================================
  // UPDATE USER LOCALLY
  // ================================
  updateUser: (updates) => set((state) => ({ user: { ...state.user, ...updates } })),

  isLoggedIn: () => !!get().user,
  isAdmin: () => get().user?.role === "admin",
}));

export default useAuthStore;