import Cart from "../../models/Cart.js";
import asyncHandler from "../../utils/asyncHandler.js";

// ================================
// GET CART
// ================================
export const getCartController = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).lean();

  if (!cart) {
    cart = { items: [], subtotal: 0, tax: 0, total: 0 };
  }

  return res.status(200).json({ success: true, cart });
});

// ================================
// ADD TO CART
// ================================
export const addToCartController = asyncHandler(async (req, res) => {
  const { itemType, itemId, name, domain, billingCycle, quantity = 1, price, details } = req.body;

  if (!itemType || !name || !price) {
    return res.status(400).json({ success: false, message: "Item type, name, and price are required" });
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const totalPrice = price * quantity;
  const newItem = { itemType, itemId, name, domain, billingCycle, quantity, price, totalPrice, details };

  // Check if same item exists (same name + billingCycle)
  const existingIndex = cart.items.findIndex(
    (item) => item.name === name && item.billingCycle === billingCycle
  );

  if (existingIndex > -1) {
    cart.items[existingIndex] = newItem; // Replace (not duplicate)
  } else {
    cart.items.push(newItem);
  }

  await cart.save();

  return res.status(200).json({ success: true, message: "Added to cart", cart });
});

// ================================
// REMOVE FROM CART
// ================================
export const removeFromCartController = asyncHandler(async (req, res) => {
  const { itemName } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ success: false, message: "Cart not found" });
  }

  cart.items = cart.items.filter((item) => item.name !== decodeURIComponent(itemName));
  await cart.save();

  return res.status(200).json({ success: true, message: "Item removed", cart });
});

// ================================
// CLEAR CART
// ================================
export const clearCartController = asyncHandler(async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  return res.status(200).json({ success: true, message: "Cart cleared" });
});