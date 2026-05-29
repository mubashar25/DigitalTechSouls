import useCart from "../../../hooks/useCart";

export default function OrderSummary() {
  const { total = 0, cartCount = 0, cart = [] } = useCart();

  const subtotal = Number(total) || 0;
  const taxRate = 0.1;
  const tax = subtotal * taxRate;
  const finalTotal = subtotal + tax;

  const isEmpty = cartCount === 0;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Order Summary
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {cartCount} item{cartCount !== 1 && "s"} in cart
        </p>
      </div>

      {/* EMPTY STATE */}
      {isEmpty ? (
        <div className="text-center py-10">
          <div className="text-5xl mb-3">🛒</div>
          <p className="text-gray-500 text-sm">
            Your cart is empty
          </p>
        </div>
      ) : (
        <>
          {/* ITEMS */}
          <div className="space-y-5 mb-6">
            {cart.map((item) => {
              const qty = Number(item.quantity || 1);
              const price = Number(item.price || 0);

              return (
                <div
                  key={item.id}
                  className="flex justify-between gap-4 p-3 rounded-xl hover:bg-gray-50 transition"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.name}
                    </h3>

                    <p className="text-xs text-gray-500 capitalize mt-1">
                      {item.type}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Qty: {qty}
                    </p>
                  </div>

                  <div className="text-right font-semibold text-gray-900">
                    ${ (price * qty).toFixed(2) }
                  </div>
                </div>
              );
            })}
          </div>

          {/* BREAKDOWN */}
          <div className="space-y-4 border-t border-gray-200 pt-5">

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900 font-medium">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Tax ({taxRate * 100}%)
              </span>
              <span className="text-gray-900 font-medium">
                ${tax.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Discount</span>
              <span className="text-green-600 font-medium">
                -$0.00
              </span>
            </div>

            <div className="flex justify-between border-t border-gray-200 pt-4">
              <span className="text-lg font-bold text-gray-900">
                Total
              </span>
              <span className="text-2xl font-extrabold text-gray-900">
                ${finalTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* PROMO INPUT */}
          <div className="mt-6">
            <input
              type="text"
              placeholder="Enter promo code"
              className="w-full border border-gray-200 px-4 py-3 rounded-xl text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                         bg-gray-50"
            />
          </div>

          {/* TRUST BADGES */}
          <div className="mt-6 space-y-3 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>Secure encrypted checkout</span>
            </div>

            <div className="flex items-center gap-2">
              <span>💳</span>
              <span>All major payment methods</span>
            </div>

            <div className="flex items-center gap-2">
              <span>⚡</span>
              <span>Instant activation</span>
            </div>

            <div className="flex items-center gap-2">
              <span>↩</span>
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}