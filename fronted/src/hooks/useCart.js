import { useMemo } from "react";

import {
  useCartContext,
} from "../store/cartStore";

export default function useCart() {

  const context =
    useCartContext();

  const {
    cart = [],

    // actions
    addToCart,
    removeFromCart,
    clearCart,
    increaseQty,
    decreaseQty,
    updateCartItem,

    // totals
    subtotal = 0,
    tax = 0,
    serviceFee = 0,
    total = 0,

    // counters
    itemCount = 0,

    // helpers
    hasHosting = false,
    hasDomain = false,
    isEmpty = true,
  } = context || {};

  return useMemo(
    () => {

      // ========================================
      // 🖥 HOSTING ITEMS
      // ========================================
      const hostingItems =
        cart.filter(
          (item) =>
            item.type ===
            "hosting"
        );

      // ========================================
      // 🌐 DOMAIN ITEMS
      // ========================================
      const domainItems =
        cart.filter(
          (item) =>
            item.type ===
            "domain"
        );

      // ========================================
      // 💰 FORMATTED VALUES
      // ========================================
      const formattedSubtotal =
        `$${Number(
          subtotal
        ).toFixed(2)}`;

      const formattedTax =
        `$${Number(
          tax
        ).toFixed(2)}`;

      const formattedServiceFee =
        `$${Number(
          serviceFee
        ).toFixed(2)}`;

      const formattedTotal =
        `$${Number(
          total
        ).toFixed(2)}`;

      return {

        // ========================================
        // 🛒 DATA
        // ========================================
        cart,

        hostingItems,
        domainItems,

        // ========================================
        // ⚡ ACTIONS
        // ========================================
        addToCart,
        removeFromCart,
        clearCart,

        increaseQty,
        decreaseQty,

        updateCartItem,

        // ========================================
        // 💰 TOTALS
        // ========================================
        subtotal,
        tax,
        serviceFee,
        total,

        formattedSubtotal,
        formattedTax,
        formattedServiceFee,
        formattedTotal,

        // ========================================
        // 🔢 COUNTERS
        // ========================================
        itemCount,
        cartCount:
          itemCount,

        hostingCount:
          hostingItems.length,

        domainCount:
          domainItems.length,

        // ========================================
        // 🧠 HELPERS
        // ========================================
        isEmpty,

        hasHosting,
        hasDomain,

        hasItems:
          itemCount > 0,

        // ========================================
        // 🔍 FIND ITEM
        // ========================================
        getCartItem:
          (id) => {

            return cart.find(
              (item) =>
                item.id === id
            );
          },

        // ========================================
        // 🔍 CHECK ITEM
        // ========================================
        isInCart:
          (id) => {

            return cart.some(
              (item) =>
                item.id === id
            );
          },
      };
    },

    [
      cart,

      addToCart,
      removeFromCart,
      clearCart,

      increaseQty,
      decreaseQty,

      updateCartItem,

      subtotal,
      tax,
      serviceFee,
      total,

      itemCount,

      isEmpty,
      hasHosting,
      hasDomain,
    ]
  );
}