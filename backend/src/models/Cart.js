import mongoose from "mongoose";

const cartItemSchema =
  new mongoose.Schema(
    {
      itemType: {
        type: String,
        enum: [
          "hosting",
          "domain",
        ],
        required: true,
      },

      itemId: {
        type:
          mongoose.Schema.Types.ObjectId,
      },

      name: {
        type: String,
        required: true,
      },

      domain: {
        type: String,
      },

      billingCycle: {
        type: String,
        enum: [
          "monthly",
          "yearly",
        ],
      },

      quantity: {
        type: Number,
        default: 1,
      },

      price: {
        type: Number,
        required: true,
      },

      totalPrice: {
        type: Number,
        required: true,
      },
    },
    {
      _id: false,
    }
  );

const cartSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },

      items: [cartItemSchema],

      subtotal: {
        type: Number,
        default: 0,
      },

      tax: {
        type: Number,
        default: 0,
      },

      total: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

const Cart = mongoose.model(
  "Cart",
  cartSchema
);

export default Cart;