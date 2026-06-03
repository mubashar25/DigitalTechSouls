import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    itemType: { type: String, enum: ["hosting", "domain"], required: true },
    itemId: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    domain: { type: String },
    billingCycle: { type: String, enum: ["monthly", "yearly"] },
    quantity: { type: Number, default: 1, min: 1 },
    price: { type: Number, required: true, min: 0 },
    totalPrice: { type: Number, required: true, min: 0 },
    details: { type: mongoose.Schema.Types.Mixed },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
    subtotal: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Recalculate totals before save
cartSchema.pre("save", function () {
  this.subtotal = this.items.reduce((sum, item) => sum + item.totalPrice, 0);
  this.tax = Math.round(this.subtotal * 0.05 * 100) / 100; // 5% tax
  this.total = Math.round((this.subtotal + this.tax) * 100) / 100;
});

cartSchema.index({ user: 1 }, { unique: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;