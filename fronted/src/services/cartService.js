import api from "./api";

// ========================================
// 🧠 NORMALIZE ERROR
// ========================================
const handleError = (error, fallback) => {
  const err = new Error(
    error?.response?.data?.message ||
    error?.message ||
    fallback
  );

  err.status =
    error?.status ||
    error?.response?.status ||
    500;

  throw err;
};

// ========================================
// 🧾 NORMALIZE ORDER ITEMS
// ========================================
const normalizeItems = (items = []) => {
  return items.map((item) => ({
    productId: item.id,
    name: item.name,
    type: item.type,
    price: Number(item.price || 0),
    quantity: Number(item.quantity || 1),
    billingCycle: item.billingCycle || "monthly",
    metadata: item.metadata || {},
  }));
};

// ========================================
// 🛒 CREATE ORDER
// ========================================
export const createOrderAPI = async ({
  cartItems = [],
  paymentMethod = "stripe",
}) => {
  try {
    // ❌ VALIDATION
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      const err = new Error("Cart is empty");
      err.status = 400;
      throw err;
    }

    // ✅ REQUEST BODY
    const payload = {
      items: normalizeItems(cartItems),
      paymentMethod,
    };

    // ✅ API REQUEST
    const response = await api.post("/orders", payload);

    return response.data;
  } catch (error) {
    handleError(error, "Failed to create order");
  }
};

// ========================================
// 📦 GET MY ORDERS
// ========================================
export const getMyOrdersAPI = async () => {
  try {
    const response = await api.get("/orders/my-orders");
    return response.data;
  } catch (error) {
    handleError(error, "Failed to fetch orders");
  }
};

// ========================================
// 📦 GET SINGLE ORDER
// ========================================
export const getSingleOrderAPI = async (orderId) => {
  try {
    if (!orderId) {
      const err = new Error("Order ID is required");
      err.status = 400;
      throw err;
    }

    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    handleError(error, "Failed to fetch order");
  }
};

// ========================================
// ❌ CANCEL ORDER
// ========================================
export const cancelOrderAPI = async (orderId) => {
  try {
    if (!orderId) {
      const err = new Error("Order ID is required");
      err.status = 400;
      throw err;
    }

    const response = await api.put(`/orders/cancel/${orderId}`);
    return response.data;
  } catch (error) {
    handleError(error, "Failed to cancel order");
  }
};

// ========================================
// 💳 CHECKOUT
// ========================================
export const checkoutAPI = async ({
  cartItems = [],
  customerInfo = {},
  paymentMethod = "stripe",
}) => {
  try {
    // ❌ VALIDATION
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      const err = new Error("Cart is empty");
      err.status = 400;
      throw err;
    }

    // ✅ REQUEST BODY
    const payload = {
      items: normalizeItems(cartItems),
      customerInfo,
      paymentMethod,
    };

    // ✅ API REQUEST
    const response = await api.post("/checkout", payload);

    return response.data;
  } catch (error) {
    handleError(error, "Checkout failed");
  }
};

// ========================================
// 💳 VERIFY PAYMENT
// ========================================
export const verifyPaymentAPI = async ({
  orderId,
  transactionId,
}) => {
  try {
    if (!orderId || !transactionId) {
      const err = new Error("Payment verification data missing");
      err.status = 400;
      throw err;
    }

    const response = await api.post("/payments/verify", {
      orderId,
      transactionId,
    });

    return response.data;
  } catch (error) {
    handleError(error, "Payment verification failed");
  }
};