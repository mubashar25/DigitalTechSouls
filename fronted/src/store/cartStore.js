import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

const CartContext =
  createContext(null);

// ========================================
// 🧠 SAFE STORAGE LOAD
// ========================================
const loadCart = () => {

  if (
    typeof window ===
    "undefined"
  ) {
    return [];
  }

  try {

    const savedCart =
      localStorage.getItem(
        "cart"
      );

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  } catch (error) {

    console.error(
      "Cart parse error:",
      error
    );

    return [];
  }
};

// ========================================
// 🧠 GENERATE CART ITEM
// ========================================
const normalizeCartItem = (
  product
) => {

  return {
    id:
      product.id ||
      crypto.randomUUID(),

    name:
      product.name || "Item",

    type:
      product.type || "product",

    price:
      Number(product.price) || 0,

    quantity:
      Number(product.quantity) || 1,

    image:
      product.image || "",

    billingCycle:
      product.billingCycle ||
      "monthly",

    category:
      product.category || "",

    metadata:
      product.metadata || {},
  };
};

export function CartProvider({
  children,
}) {

  const [cart, setCart] =
    useState(loadCart);

  // ========================================
  // 💾 SAVE CART
  // ========================================
  useEffect(() => {

    try {

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );

    } catch (error) {

      console.error(
        "Cart save error:",
        error
      );
    }
  }, [cart]);

  // ========================================
  // ➕ ADD TO CART
  // ========================================
  const addToCart =
    useCallback(
      (product) => {

        const item =
          normalizeCartItem(
            product
          );

        setCart((prevCart) => {

          const existingItem =
            prevCart.find(
              (cartItem) =>
                cartItem.id ===
                item.id
            );

          // 🔥 ALREADY EXISTS
          if (existingItem) {

            return prevCart.map(
              (cartItem) =>
                cartItem.id ===
                item.id
                  ? {
                      ...cartItem,
                      quantity:
                        cartItem.quantity +
                        item.quantity,
                    }
                  : cartItem
            );
          }

          // 🆕 NEW ITEM
          return [
            ...prevCart,
            item,
          ];
        });
      },
      []
    );

  // ========================================
  // ❌ REMOVE ITEM
  // ========================================
  const removeFromCart =
    useCallback((id) => {

      setCart((prevCart) =>
        prevCart.filter(
          (item) =>
            item.id !== id
        )
      );
    }, []);

  // ========================================
  // ➕ INCREASE QTY
  // ========================================
  const increaseQty =
    useCallback((id) => {

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        )
      );
    }, []);

  // ========================================
  // ➖ DECREASE QTY
  // ========================================
  const decreaseQty =
    useCallback((id) => {

      setCart((prevCart) =>
        prevCart
          .map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity:
                    item.quantity - 1,
                }
              : item
          )
          .filter(
            (item) =>
              item.quantity > 0
          )
      );
    }, []);

  // ========================================
  // 🔄 UPDATE ITEM
  // ========================================
  const updateCartItem =
    useCallback(
      (id, updates) => {

        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  ...updates,
                }
              : item
          )
        );
      },
      []
    );

  // ========================================
  // 🧹 CLEAR CART
  // ========================================
  const clearCart =
    useCallback(() => {

      setCart([]);

      localStorage.removeItem(
        "cart"
      );
    }, []);

  // ========================================
  // 💰 TOTAL
  // ========================================
  const subtotal =
    useMemo(() => {

      return cart.reduce(
        (sum, item) =>
          sum +
          Number(item.price || 0) *
            Number(
              item.quantity || 1
            ),
        0
      );
    }, [cart]);

  // ========================================
  // 💸 TAX
  // ========================================
  const tax =
    useMemo(() => {

      return subtotal * 0.05;
    }, [subtotal]);

  // ========================================
  // 🚚 FEES
  // ========================================
  const serviceFee =
    useMemo(() => {

      return cart.length > 0
        ? 2
        : 0;
    }, [cart]);

  // ========================================
  // 💳 FINAL TOTAL
  // ========================================
  const total =
    useMemo(() => {

      return (
        subtotal +
        tax +
        serviceFee
      );
    }, [
      subtotal,
      tax,
      serviceFee,
    ]);

  // ========================================
  // 🔢 ITEM COUNT
  // ========================================
  const itemCount =
    useMemo(() => {

      return cart.reduce(
        (count, item) =>
          count +
          Number(
            item.quantity || 1
          ),
        0
      );
    }, [cart]);

  // ========================================
  // 🧠 HELPERS
  // ========================================
  const hasHosting =
    useMemo(() => {

      return cart.some(
        (item) =>
          item.type ===
          "hosting"
      );
    }, [cart]);

  const hasDomain =
    useMemo(() => {

      return cart.some(
        (item) =>
          item.type ===
          "domain"
      );
    }, [cart]);

  // ========================================
  // ⚡ CONTEXT VALUE
  // ========================================
  const value = useMemo(
    () => ({
      cart,

      // actions
      addToCart,
      removeFromCart,
      increaseQty,
      decreaseQty,
      updateCartItem,
      clearCart,

      // totals
      subtotal,
      tax,
      serviceFee,
      total,

      // counters
      itemCount,

      // helpers
      isEmpty:
        cart.length === 0,

      hasHosting,
      hasDomain,
    }),
    [
      cart,
      addToCart,
      removeFromCart,
      increaseQty,
      decreaseQty,
      updateCartItem,
      clearCart,
      subtotal,
      tax,
      serviceFee,
      total,
      itemCount,
      hasHosting,
      hasDomain,
    ]
  );

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}

// ========================================
// 🧠 SAFE HOOK
// ========================================
export function useCartContext() {

  const context =
    useContext(CartContext);

  if (!context) {

    throw new Error(
      "useCartContext must be used inside CartProvider"
    );
  }

  return context;
}