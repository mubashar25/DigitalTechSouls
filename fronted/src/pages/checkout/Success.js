import {
  CheckCircle2,
  Server,
  Globe,
  ArrowRight,
} from "lucide-react";

import {
  Link,
  Navigate,
} from "react-router-dom";

import Container from "../../components/common/Container";
import Button from "../../components/ui/Button";

import useCart from "../../hooks/useCart";

export default function Success() {

  const {
    cart,
    total,
    clearCart,
  } = useCart();

  // 🧠 EMPTY CHECK
  if (!cart || cart.length === 0) {
    return <Navigate to="/" replace />;
  }

  // 🖥️ HOSTING
  const hostingItem = cart.find(
    (item) => item.type === "hosting"
  );

  // 🌐 DOMAIN
  const domainItem = cart.find(
    (item) =>
      item.type === "domain" ||
      item.type === "existing-domain" ||
      item.type === "domain-transfer"
  );

  // 🔥 FINISH ORDER
  const handleFinish = () => {
    clearCart();
  };

  return (
    <section className="py-20 bg-gray-50 min-h-screen">

      <Container>

        <div className="max-w-5xl mx-auto">

          {/* SUCCESS CARD */}
          <div className="bg-white border rounded-3xl shadow-sm overflow-hidden">

            {/* ================================================= */}
            {/* TOP SECTION */}
            {/* ================================================= */}

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-14 text-center text-white">

              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto">
                <CheckCircle2 size={58} />
              </div>

              <h1 className="text-4xl font-bold mt-6">
                Payment Successful 🎉
              </h1>

              <p className="text-blue-100 mt-3 text-lg max-w-2xl mx-auto">
                Thank you for your order. Your services are now
                being prepared and activated.
              </p>

            </div>

            {/* ================================================= */}
            {/* BODY */}
            {/* ================================================= */}

            <div className="p-8 lg:p-10">

              {/* ORDER DETAILS */}
              <div className="grid md:grid-cols-2 gap-6">

                {/* HOSTING */}
                {hostingItem && (
                  <div className="border rounded-2xl p-6 bg-gray-50">

                    <div className="flex items-center gap-3">

                      <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                        <Server size={24} />
                      </div>

                      <div>
                        <h2 className="font-bold text-gray-900">
                          Hosting Plan
                        </h2>

                        <p className="text-sm text-gray-500">
                          Hosting service activated
                        </p>
                      </div>

                    </div>

                    <div className="mt-6">

                      <h3 className="text-xl font-semibold text-gray-900">
                        {hostingItem.name}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        Premium hosting infrastructure
                      </p>

                    </div>

                    <div className="mt-6 flex items-center justify-between">

                      <span className="text-sm text-gray-500">
                        Price
                      </span>

                      <span className="font-bold text-gray-900">
                        ${Number(hostingItem.price).toFixed(2)}
                      </span>

                    </div>

                  </div>
                )}

                {/* DOMAIN */}
                {domainItem && (
                  <div className="border rounded-2xl p-6 bg-gray-50">

                    <div className="flex items-center gap-3">

                      <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                        <Globe size={24} />
                      </div>

                      <div>

                        <h2 className="font-bold text-gray-900">
                          Domain Service
                        </h2>

                        <p className="text-sm text-gray-500">
                          Domain setup details
                        </p>

                      </div>

                    </div>

                    <div className="mt-6">

                      <h3 className="text-xl font-semibold text-gray-900 break-all">
                        {domainItem.name}
                      </h3>

                      <p className="text-gray-500 mt-1">

                        {domainItem.type === "domain" &&
                          "New domain registered successfully"}

                        {domainItem.type === "existing-domain" &&
                          "Existing domain connected successfully"}

                        {domainItem.type === "domain-transfer" &&
                          "Domain transfer request submitted"}

                      </p>

                    </div>

                    <div className="mt-6 flex items-center justify-between">

                      <span className="text-sm text-gray-500">
                        Price
                      </span>

                      <span className="font-bold text-gray-900">
                        ${Number(domainItem.price).toFixed(2)}
                      </span>

                    </div>

                  </div>
                )}

              </div>

              {/* TOTAL */}
              <div className="mt-8 border rounded-2xl p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="text-xl font-bold text-gray-900">
                      Total Paid
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Payment processed successfully
                    </p>

                  </div>

                  <span className="text-3xl font-bold text-gray-900">
                    ${Number(total).toFixed(2)}
                  </span>

                </div>

              </div>

              {/* NEXT STEPS */}
              <div className="mt-8 border rounded-2xl p-6 bg-blue-50 border-blue-200">

                <h3 className="text-lg font-bold text-blue-900">
                  Next Steps
                </h3>

                <div className="mt-5 space-y-4">

                  <div className="flex gap-3">

                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                      1
                    </div>

                    <p className="text-blue-800">
                      Hosting account activation is in progress.
                    </p>

                  </div>

                  <div className="flex gap-3">

                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                      2
                    </div>

                    <p className="text-blue-800">
                      Domain DNS configuration will be completed automatically.
                    </p>

                  </div>

                  <div className="flex gap-3">

                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                      3
                    </div>

                    <p className="text-blue-800">
                      Login details and setup information will be emailed to you.
                    </p>

                  </div>

                </div>

              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">

                <Link
                  to="/"
                  className="flex-1"
                  onClick={handleFinish}
                >
                  <Button className="w-full">
                    Go To Homepage
                  </Button>
                </Link>

                <Link
                  to="/dashboard"
                  className="flex-1"
                  onClick={handleFinish}
                >
                  <Button
                    variant="secondary"
                    className="w-full"
                  >

                    <span className="flex items-center justify-center gap-2">
                      Open Dashboard
                      <ArrowRight size={18} />
                    </span>

                  </Button>
                </Link>

              </div>

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}