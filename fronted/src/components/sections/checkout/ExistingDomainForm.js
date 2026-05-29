import { useState } from "react";

import {
  Globe,
  CheckCircle2,
} from "lucide-react";

import Button from "../../ui/Button";

import useCart from "../../../hooks/useCart";

export default function ExistingDomainForm() {

  const { addToCart } = useCart();

  const [domain, setDomain] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  // =================================================
  // 🔥 VALIDATION
  // =================================================

  const isValidDomain = (value) => {
    return /^[a-z0-9-]+\.[a-z]{2,}$/i.test(
      value
    );
  };

  // =================================================
  // 🔥 CONTINUE
  // =================================================

  const handleContinue = () => {

    if (!isValidDomain(domain)) {
      return;
    }

    addToCart({
      id: `existing_${domain}`,
      type: "existing-domain",
      name: domain,
      domain,
      price: 0,
    });

    setSuccess(true);

  };

  return (
    <div className="bg-white border rounded-3xl p-6 shadow-sm">

      {/* HEADER */}
      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">

          <Globe size={28} />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-900">
            Use Existing Domain
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Connect a domain you already own.
          </p>

        </div>

      </div>

      {/* INPUT */}
      <div className="mt-8">

        <label className="block text-sm font-medium text-gray-700 mb-2">

          Your Domain Name

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

      {/* INFO */}
      <div className="mt-5 p-5 rounded-2xl bg-gray-50 border border-gray-200">

        <p className="text-sm text-gray-600 leading-relaxed">

          You will need to update your domain
          nameservers after completing your
          order to connect your hosting.

        </p>

      </div>

      {/* SUCCESS */}
      {success && (
        <div className="mt-5 p-5 rounded-2xl bg-green-50 border border-green-200">

          <div className="flex items-center gap-2 text-green-700">

            <CheckCircle2 size={22} />

            <h3 className="font-semibold">
              Existing domain connected
            </h3>

          </div>

          <p className="text-sm text-green-700 mt-2">

            {domain} has been added to
            your cart successfully.

          </p>

        </div>
      )}

      {/* BUTTON */}
      <div className="mt-6">

        <Button
          onClick={handleContinue}
          disabled={!isValidDomain(domain)}
        >
          Continue With This Domain
        </Button>

      </div>

    </div>
  );
}