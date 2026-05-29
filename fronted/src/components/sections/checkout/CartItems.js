import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import useCart from "../../../hooks/useCart";

export default function CartItems() {
  const {
    cart = [],
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  if (!cart.length) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
        <ShoppingCart size={70} className="text-gray-300 mx-auto mb-5" />
        <h2 className="text-2xl font-bold text-gray-800">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mt-2">
          Add hosting or domains to continue
        </p>
      </div>
    );
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case "hosting":
        return "Hosting";
      case "domain":
        return "Domain";
      case "existing-domain":
        return "Existing Domain";
      case "domain-transfer":
        return "Domain Transfer";
      default:
        return "Service";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "hosting":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "domain":
        return "bg-green-50 text-green-600 border-green-200";
      case "existing-domain":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "domain-transfer":
        return "bg-orange-50 text-orange-600 border-orange-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {cart.map((item) => {
        const price = Number(item.price || 0);
        const qty = Number(item.quantity || 1);
        const subtotal = price * qty;

        return (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-6">

              {/* LEFT */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 break-all">
                  {item.name}
                </h3>

                <span
                  className={`inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full border ${getTypeColor(
                    item.type
                  )}`}
                >
                  {getTypeLabel(item.type)}
                </span>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-6">

                {/* QTY */}
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition"
                  >
                    <Minus size={16} className="text-gray-700" />
                  </button>

                  <div className="w-12 text-center font-semibold text-gray-800">
                    {qty}
                  </div>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition"
                  >
                    <Plus size={16} className="text-gray-700" />
                  </button>
                </div>

                {/* PRICE */}
                <div className="min-w-[110px] text-right">
                  <p className="text-xs text-gray-500">Subtotal</p>
                  <p className="text-xl font-bold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </p>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition"
                >
                  <Trash2 size={16} />
                  <span className="text-sm font-medium">Remove</span>
                </button>

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}