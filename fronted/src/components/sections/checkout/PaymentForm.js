import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../ui/Button";
import useCart from "../../../hooks/useCart";
import { checkoutAPI } from "../../../services/cartService";

export default function PaymentForm() {
  const navigate = useNavigate();
  const { cart = [], total = 0, clearCart } = useCart();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    card: "",
    expiry: "",
    cvv: "",
  });

  // INPUT HANDLER
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "card") {
      value = value.replace(/\D/g, "").slice(0, 16);
    }

    if (name === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 4);
    }

    if (name === "expiry") {
      value = value.replace(/\D/g, "").slice(0, 4);

      if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2);
      }
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // VALIDATION
  const isValid =
    form.name.trim().length > 2 &&
    form.email.includes("@") &&
    form.card.length === 16 &&
    form.expiry.length === 5 &&
    form.cvv.length >= 3;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      toast.error("Please fill all fields correctly");
      return;
    }

    if (!cart.length) {
      toast.error("Cart is empty");
      return;
    }

    setLoading(true);

    try {
      await checkoutAPI({
        customer: {
          name: form.name,
          email: form.email,
        },
        payment: {
          cardLast4: form.card.slice(-4),
        },
        items: cart,
        total,
      });

      clearCart();

      setForm({
        name: "",
        email: "",
        card: "",
        expiry: "",
        cvv: "",
      });

      toast.success("Payment successful 🎉");

      navigate("/success");
    } catch (err) {
      toast.error(err?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <h2 className="text-xl font-semibold text-gray-900">
        Payment Details
      </h2>

      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <input
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
        className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <input
        name="card"
        placeholder="Card Number"
        value={form.card}
        onChange={handleChange}
        className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          name="expiry"
          placeholder="MM/YY"
          value={form.expiry}
          onChange={handleChange}
          className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          name="cvv"
          placeholder="CVV"
          value={form.cvv}
          onChange={handleChange}
          className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <p className="text-xs text-gray-400">
        🔒 Secure encrypted payment processing
      </p>

      <Button
        type="submit"
        className="w-full"
        disabled={loading || !isValid}
      >
        {loading
          ? "Processing..."
          : `Pay $${Number(total).toFixed(2)}`}
      </Button>
    </form>
  );
}