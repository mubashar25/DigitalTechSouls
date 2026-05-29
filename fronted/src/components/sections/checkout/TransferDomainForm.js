import { useState } from "react";

import {
  RefreshCcw,
  ShieldCheck,
  ArrowRightLeft,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import Button from "../../ui/Button";

import useCart from "../../../hooks/useCart";

export default function TransferDomainForm() {

  const { addToCart } = useCart();

  const [domain, setDomain] =
    useState("");

  const [authCode, setAuthCode] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  // =================================================
  // 🔥 VALIDATION
  // =================================================

  const isValid =
    domain.trim().length > 3 &&
    authCode.trim().length > 3;

  // =================================================
  // 🔥 TRANSFER DOMAIN
  // =================================================

  const handleTransfer = async () => {

    if (!isValid) return;

    try {

      setLoading(true);
      setSuccess(false);

      // ⏳ MOCK API
      await new Promise((res) =>
        setTimeout(res, 1800)
      );

      addToCart({
        id: `transfer_${domain}`,
        type: "domain-transfer",
        name: `${domain} Transfer`,
        domain,
        price: 14.99,
      });

      setSuccess(true);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="bg-white border rounded-3xl p-6 shadow-sm">

      {/* HEADER */}
      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">

          <RefreshCcw size={28} />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-900">
            Transfer Your Domain
          </h2>

          <p className="text-gray-500 mt-1 text-sm">
            Move your domain to our platform.
          </p>

        </div>

      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">

        <div className="p-4 rounded-2xl border bg-gray-50">

          <ShieldCheck
            size={22}
            className="text-green-600"
          />

          <h3 className="mt-3 font-semibold text-gray-900">
            Secure Transfer
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Safe and protected transfer process.
          </p>

        </div>

        <div className="p-4 rounded-2xl border bg-gray-50">

          <ArrowRightLeft
            size={22}
            className="text-blue-600"
          />

          <h3 className="mt-3 font-semibold text-gray-900">
            Easy Migration
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Transfer your domain easily.
          </p>

        </div>

        <div className="p-4 rounded-2xl border bg-gray-50">

          <RefreshCcw
            size={22}
            className="text-purple-600"
          />

          <h3 className="mt-3 font-semibold text-gray-900">
            Free Renewal
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Includes one-year renewal.
          </p>

        </div>

      </div>

      {/* FORM */}
      <div className="mt-8 space-y-5">

        {/* DOMAIN */}
        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">

            Domain Name

          </label>

          <input
            type="text"
            placeholder="example.com"
            value={domain}
            onChange={(e) =>
              setDomain(
                e.target.value
                  .toLowerCase()
                  .trim()
              )
            }
            className="
              w-full h-14 px-4 rounded-2xl
              border border-gray-300
              focus:outline-none
              focus:ring-2 focus:ring-blue-500
            "
          />

        </div>

        {/* AUTH */}
        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">

            EPP / Authorization Code

          </label>

          <input
            type="text"
            placeholder="Enter transfer authorization code"
            value={authCode}
            onChange={(e) =>
              setAuthCode(
                e.target.value
              )
            }
            className="
              w-full h-14 px-4 rounded-2xl
              border border-gray-300
              focus:outline-none
              focus:ring-2 focus:ring-blue-500
            "
          />

        </div>

      </div>

      {/* INFO */}
      <div className="mt-6 p-5 rounded-2xl bg-blue-50 border border-blue-200">

        <p className="text-sm text-blue-700 leading-relaxed">

          Make sure your domain is unlocked
          before starting the transfer.

        </p>

      </div>

      {/* SUCCESS */}
      {success && (
        <div className="mt-6 p-5 rounded-2xl bg-green-50 border border-green-200">

          <div className="flex items-center gap-2 text-green-700">

            <CheckCircle2 size={22} />

            <h3 className="font-semibold">
              Domain transfer added to cart
            </h3>

          </div>

          <p className="text-sm text-green-700 mt-2">

            {domain} transfer is ready
            for checkout.

          </p>

        </div>
      )}

      {/* BUTTON */}
      <div className="mt-8">

        <Button
          onClick={handleTransfer}
          disabled={loading || !isValid}
          className="w-full md:w-auto"
        >

          {loading ? (
            <span className="flex items-center gap-2">

              <Loader2
                size={18}
                className="animate-spin"
              />

              Processing Transfer...

            </span>
          ) : (
            "Transfer Domain"
          )}

        </Button>

      </div>

    </div>
  );
}