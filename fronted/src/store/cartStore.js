import { create } from "zustand";
import api from "../services/api.js";
import toast from "react-hot-toast";

const useCartStore = create((set, get) => ({
  items: [],
  subtotal: 0,
  tax: 0,
  total: 0,
  isLoading: false,

  // ================================
  // FETCH CART FROM BACKEND
  // ================================
  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get("/cart");
      set({ ...data.cart, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  // ================================
  // ADD ITEM
  // ================================
  addItem: async (item) => {
    try {
      const { data } = await api.post("/cart/add", item);
      set({ ...data.cart });
      toast.success(`${item.name} added to cart!`);
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add item");
      return { success: false };
    }
  },

  // ================================
  // REMOVE ITEM
  // ================================
  removeItem: async (itemName) => {
    try {
      const { data } = await api.delete(`/cart/remove/${encodeURIComponent(itemName)}`);
      set({ ...data.cart });
      toast.success("Item removed");
    } catch {
      toast.error("Failed to remove item");
    }
  },

  // ================================
  // CLEAR CART
  // ================================
  clearCart: async () => {
    try {
      await api.delete("/cart/clear");
      set({ items: [], subtotal: 0, tax: 0, total: 0 });
    } catch {}
  },

  itemCount: () => get().items.length,
}));

export default useCartStore;