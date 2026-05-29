import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";

import { createOrderAPI } from "../../services/cartService";

import CartItems from "../../components/sections/checkout/CartItems";
import OrderSummary from "../../components/sections/checkout/OrderSummary";

import Container from "../../components/common/Container";
import Button from "../../components/ui/Button";

export default function Cart() {
  const navigate = useNavigate();

  const { cart, cartCount, total, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  const hasHosting = cart.some((item) => item.type === "hosting");

  const hasDomain = cart.some((item) =>
    ["domain", "existing-domain", "domain-transfer"].includes(item.type)
  );

  const hostingItem = cart.find((item) => item.type === "hosting");

  const domainItem = cart.find((item) =>
    ["domain", "existing-domain", "domain-transfer"].includes(item.type)
  );

  const handleCheckout = async () => {
    try {
      if (!isAuthenticated) {
        toast.error("Please login to continue");
        navigate("/login");
        return;
      }

      if (!cart.length) {
        toast.error("Your cart is empty");
        return;
      }

      await createOrderAPI(cart);

      toast.success("Order created successfully");
      navigate("/checkout");
    } catch (error) {
      toast.error(error.message || "Checkout failed");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0B1220] via-[#0B1220] to-[#0a0f1c] text-white py-16 md:py-24">
      <Container>

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">

          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Your Cart
            </h1>

            <p className="text-gray-400 mt-2 text-sm md:text-base">
              {cartCount} item{cartCount !== 1 && "s"} in your cart
            </p>
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="self-start md:self-auto text-sm text-red-400 hover:text-red-300 transition"
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* EMPTY STATE */}
        {cart.length === 0 ? (
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl py-20 text-center px-6">

            <div className="text-6xl mb-6">🛒</div>

            <h2 className="text-2xl md:text-3xl font-bold">
              Your cart is empty
            </h2>

            <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm md:text-base">
              Start by choosing hosting, domain, or web development services.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

              <Link to="/hosting">
                <Button className="w-full sm:w-auto">
                  Browse Hosting
                </Button>
              </Link>

              <Link to="/domain">
                <Button variant="secondary" className="w-full sm:w-auto">
                  Search Domains
                </Button>
              </Link>

            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-start">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">

              {/* DOMAIN WARNING */}
              {hasHosting && !hasDomain && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5 md:p-6">
                  <h3 className="text-yellow-300 font-semibold">
                    Domain Required
                  </h3>

                  <p className="text-yellow-200/70 text-sm mt-2">
                    Add a domain to launch your hosting professionally.
                  </p>

                  <Link
                    to="/domain-selection"
                    className="inline-block mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    + Add Domain
                  </Link>
                </div>
              )}

              {/* ORDER OVERVIEW */}
              {(hostingItem || domainItem) && (
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 md:p-6">

                  <h3 className="text-lg md:text-xl font-semibold">
                    Order Overview
                  </h3>

                  <div className="mt-5 space-y-4">

                    {hostingItem && (
                      <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                        <div>
                          <p className="font-medium">
                            {hostingItem.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            Hosting service
                          </p>
                        </div>

                        <span className="font-bold">
                          ${hostingItem.price}
                        </span>
                      </div>
                    )}

                    {domainItem && (
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="font-medium">
                            {domainItem.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            Domain service
                          </p>
                        </div>

                        <span className="font-bold">
                          ${domainItem.price}
                        </span>
                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* CART ITEMS */}
              <CartItems />

            </div>

            {/* RIGHT SIDE (STICKY SIDEBAR) */}
            <div className="space-y-5 lg:sticky lg:top-24 h-fit">

              <OrderSummary />

              {/* TOTAL CARD */}
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5">

                <p className="text-gray-400 text-sm">
                  Estimated Total
                </p>

                <h3 className="text-3xl font-extrabold mt-2">
                  ${total.toFixed(2)}
                </h3>
              </div>

              {/* ACTIONS */}
              <div className="space-y-3">

                <Button
                  className="w-full"
                  onClick={handleCheckout}
                >
                  Proceed To Checkout
                </Button>

                <Link to="/hosting">
                  <Button
                    variant="secondary"
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                </Link>

              </div>

              {/* TRUST */}
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 text-sm text-gray-400 space-y-3">

                <p>🔒 SSL secured checkout</p>
                <p>⚡ Instant activation</p>
                <p>💰 30-day refund policy</p>
                <p>🌍 Global domain support</p>

              </div>

            </div>

          </div>
        )}

      </Container>
    </section>
  );
}