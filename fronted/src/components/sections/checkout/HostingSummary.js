import {
  CheckCircle2,
  ShieldCheck,
  Mail,
  Database,
  Globe,
  CreditCard,
} from "lucide-react";

import useCart from "../../../hooks/useCart";

export default function HostingSummary() {
  const {
    cart,
    total,
    cartCount,
  } = useCart();

  // 🧠 HOSTING ITEM
  const hostingItem = cart.find(
    (item) => item.type === "hosting"
  );

  // 🧠 DOMAIN ITEM
  const domainItem = cart.find(
    (item) =>
      item.type === "domain" ||
      item.type === "existing-domain" ||
      item.type === "domain-transfer"
  );

  // 💰 TAX
  const tax = total * 0.05;

  // 💰 FINAL TOTAL
  const finalTotal = total + tax;

  return (
    <div className="bg-white border rounded-2xl p-7 shadow-sm sticky top-24">

      {/* 🔥 HEADER */}
      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-gray-900">
            Hosting Summary
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Review your selected services
          </p>

        </div>

        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">

          <CreditCard size={24} />

        </div>

      </div>

      {/* ================= HOSTING ================= */}
      {hostingItem && (
        <div className="mt-8 border rounded-2xl p-5">

          <div className="flex items-start justify-between gap-4">

            <div>

              <h3 className="font-bold text-gray-900 text-lg">
                {hostingItem.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Premium cloud hosting package
              </p>

            </div>

            <span className="font-bold text-gray-900">
              ${hostingItem.price}
            </span>

          </div>

          {/* FEATURES */}
          <div className="mt-5 space-y-3">

            <div className="flex items-center gap-3 text-sm text-gray-600">

              <CheckCircle2
                size={18}
                className="text-green-500"
              />

              <span>Free SSL Certificate</span>

            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600">

              <Mail
                size={18}
                className="text-blue-500"
              />

              <span>Free Business Email</span>

            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600">

              <Database
                size={18}
                className="text-purple-500"
              />

              <span>SSD Cloud Storage</span>

            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600">

              <ShieldCheck
                size={18}
                className="text-orange-500"
              />

              <span>DDoS Protection Included</span>

            </div>

          </div>

        </div>
      )}

      {/* ================= DOMAIN ================= */}
      {domainItem && (
        <div className="mt-6 border rounded-2xl p-5">

          <div className="flex items-start justify-between gap-4">

            <div className="flex items-start gap-3">

              <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">

                <Globe size={22} />

              </div>

              <div>

                <h3 className="font-bold text-gray-900">
                  {domainItem.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">

                  {domainItem.type === "domain" &&
                    "New domain registration"}

                  {domainItem.type === "existing-domain" &&
                    "Existing domain connection"}

                  {domainItem.type === "domain-transfer" &&
                    "Domain transfer service"}

                </p>

              </div>

            </div>

            <span className="font-bold text-gray-900">
              ${domainItem.price}
            </span>

          </div>

        </div>
      )}

      {/* ================= BILLING ================= */}
      <div className="mt-8 border-t pt-6 space-y-4">

        <div className="flex items-center justify-between text-sm">

          <span className="text-gray-500">
            Subtotal
          </span>

          <span className="font-medium text-gray-900">
            ${total.toFixed(2)}
          </span>

        </div>

        <div className="flex items-center justify-between text-sm">

          <span className="text-gray-500">
            Tax (5%)
          </span>

          <span className="font-medium text-gray-900">
            ${tax.toFixed(2)}
          </span>

        </div>

        <div className="flex items-center justify-between pt-4 border-t">

          <div>

            <h3 className="text-xl font-bold text-gray-900">
              Total
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {cartCount} item
              {cartCount !== 1 && "s"}
            </p>

          </div>

          <span className="text-3xl font-bold text-gray-900">
            ${finalTotal.toFixed(2)}
          </span>

        </div>

      </div>

      {/* ================= SECURITY ================= */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-5">

        <div className="flex items-start gap-3">

          <ShieldCheck
            size={22}
            className="text-blue-600 mt-0.5"
          />

          <div>

            <h4 className="font-semibold text-blue-900">
              Secure Checkout
            </h4>

            <p className="text-sm text-blue-700 mt-1 leading-relaxed">
              Your payment and personal data are protected
              with enterprise-grade SSL encryption.
            </p>

          </div>

        </div>

      </div>

      {/* ================= GUARANTEE ================= */}
      <div className="mt-5 text-center">

        <p className="text-xs text-gray-400">
          🔒 30-Day Money Back Guarantee
        </p>

      </div>

    </div>
  );
}