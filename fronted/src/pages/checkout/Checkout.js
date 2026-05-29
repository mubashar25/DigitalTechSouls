import Container from "../../components/common/Container";
import PaymentForm from "../../components/sections/checkout/PaymentForm";
import OrderSummary from "../../components/sections/checkout/OrderSummary";

import useCart from "../../hooks/useCart";
import { Link, Navigate } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function Checkout() {

  const { cart = [], cartCount = 0, total = 0 } = useCart();

  const hasHosting = cart.some(i => i.type === "hosting");

  const hasDomain = cart.some(i =>
    ["domain", "existing-domain", "domain-transfer"].includes(i.type)
  );

  if (!Array.isArray(cart)) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <section className="py-24 bg-[#0B1220] min-h-screen text-white">

      <Container>

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between gap-6 mb-10">

          <div>

            <h1 className="text-3xl md:text-5xl font-bold">
              Checkout
            </h1>

            <p className="text-gray-400 mt-2">
              Complete order ({cartCount} items)
            </p>

            <Link
              to="/cart"
              className="text-sm text-blue-400 mt-3 inline-block hover:underline"
            >
              ← Back to Cart
            </Link>

          </div>

          <div className="bg-[#111827] border border-gray-800 rounded-2xl px-6 py-4">

            <p className="text-gray-400 text-sm">
              Order Total
            </p>

            <h2 className="text-3xl font-bold mt-1">
              ${Number(total).toFixed(2)}
            </h2>

          </div>

        </div>

        {/* EMPTY */}
        {cart.length === 0 ? (
          <div className="bg-[#111827] border border-gray-800 rounded-2xl py-20 text-center">

            <h2 className="text-2xl font-bold">Cart Empty</h2>

            <p className="text-gray-400 mt-3">
              Add hosting or domain to continue
            </p>

            <div className="mt-8 flex justify-center gap-4">

              <Link to="/hosting">
                <Button>Hosting</Button>
              </Link>

              <Link to="/domain">
                <Button variant="secondary">
                  Domain
                </Button>
              </Link>

            </div>

          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">

              {hasHosting && !hasDomain && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 p-5 rounded-2xl">
                  <p className="text-yellow-300 font-medium">
                    Domain recommended for hosting
                  </p>
                </div>
              )}

              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Billing Details
                </h2>

                <PaymentForm />
              </div>

              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5 text-gray-400 text-sm space-y-2">
                <p>🔒 Secure payment encryption</p>
                <p>⚡ Instant service activation</p>
                <p>🛡️ Money-back guarantee</p>
              </div>

            </div>

            {/* RIGHT */}
            <div className="lg:sticky lg:top-24 space-y-5">

              <OrderSummary />

              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5 text-sm text-gray-400">
                <p>Hosting + Domain + SSL included</p>
              </div>

            </div>

          </div>
        )}

      </Container>
    </section>
  );
}