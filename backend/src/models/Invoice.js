import mongoose from "mongoose";

const invoiceSchema =
  new mongoose.Schema(
    {
      // 👤 USER
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      // 🧾 ORDER
      order: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },

      // 💳 PAYMENT
      payment: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },

      // 🔢 INVOICE NUMBER
      invoiceNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

      // 💰 PRICING
      subtotal: {
        type: Number,
        required: true,
        min: 0,
      },

      tax: {
        type: Number,
        default: 0,
        min: 0,
      },

      total: {
        type: Number,
        required: true,
        min: 0,
      },

      // 🌍 CURRENCY
      currency: {
        type: String,
        default: "USD",
        uppercase: true,
      },

      // 📌 STATUS
      status: {
        type: String,
        enum: [
          "paid",
          "unpaid",
          "cancelled",
          "refunded",
        ],
        default: "unpaid",
      },

      // 📅 DATES
      dueDate: {
        type: Date,
      },

      paidAt: {
        type: Date,
      },

      // 📄 PDF FILE URL
      pdfUrl: {
        type: String,
        trim: true,
      },

      // 📝 NOTES
      notes: {
        type: String,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );

// 🔥 INDEXES
invoiceSchema.index({
  invoiceNumber: 1,
});

invoiceSchema.index({
  user: 1,
});

invoiceSchema.index({
  order: 1,
});

// 🚀 MODEL
const Invoice =
  mongoose.model(
    "Invoice",
    invoiceSchema
  );

export default Invoice;