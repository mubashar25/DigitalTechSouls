import { useState } from "react";

import {
  Search,
  CheckCircle2,
  XCircle,
  Loader2,
  Sparkles,
} from "lucide-react";

import Button from "../../ui/Button";

import useCart from "../../../hooks/useCart";
import { searchDomainAPI } from "../../../services/domainService";

export default function DomainSearch() {

  const { addToCart } = useCart();

  const [domain, setDomain] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [error, setError] =
    useState("");

  // =================================================
  // 🔥 SEARCH DOMAIN
  // =================================================

  const checkDomainAvailability =
    async () => {

      if (!domain.trim()) return;

      try {

        setLoading(true);
        setError("");
        setResult(null);

        const data = await searchDomainAPI(domain);

        // 🔥 FIND AVAILABLE
        const availableDomain =
          data.find(
            (item) => item.available
          );

        if (availableDomain) {

          setResult({
            available: true,
            domain:
              availableDomain.name,
            price:
              availableDomain.price,
          });

        } else {

          setResult({
            available: false,
            domain,
          });

        }

      } catch (error) {

        setError(
          error.message ||
            "Failed to search domain"
        );

      } finally {

        setLoading(false);

      }
    };

  // =================================================
  // 🛒 ADD DOMAIN
  // =================================================

  const handleAddDomain = () => {

    if (!result?.available) return;

    addToCart({
      id: `domain_${result.domain}`,
      type: "domain",
      name: result.domain,
      domain: result.domain,
      price: result.price,
    });

  };

  return (
    <div className="bg-white border rounded-3xl p-6 shadow-sm">

      {/* HEADER */}
      <div>

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">

            <Sparkles size={22} />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-gray-900">
              Search Your Domain
            </h2>

            <p className="text-gray-500 mt-1">
              Find the perfect domain for your website.
            </p>

          </div>

        </div>

      </div>

      {/* SEARCH */}
      <div className="mt-8 flex flex-col md:flex-row gap-4">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

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
              w-full h-14 pl-11 pr-4
              rounded-2xl border border-gray-300
              focus:outline-none focus:ring-2
              focus:ring-blue-500
            "
          />

        </div>

        <Button
          onClick={
            checkDomainAvailability
          }
          disabled={loading}
          className="h-14 px-8"
        >

          {loading ? (
            <span className="flex items-center gap-2">

              <Loader2
                size={18}
                className="animate-spin"
              />

              Checking...

            </span>
          ) : (
            "Search"
          )}

        </Button>

      </div>

      {/* ERROR */}
      {error && (
        <div className="mt-5 p-4 rounded-2xl border border-red-200 bg-red-50">

          <p className="text-sm text-red-700">
            {error}
          </p>

        </div>
      )}

      {/* RESULT */}
      {result && (
        <div
          className={`
            mt-6 p-6 rounded-3xl border
            ${
              result.available
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }
          `}
        >

          {result.available ? (
            <div>

              <div className="flex items-center gap-3 text-green-700">

                <CheckCircle2 size={24} />

                <h3 className="font-bold text-xl break-all">
                  {result.domain} is available
                </h3>

              </div>

              <p className="mt-3 text-sm text-green-700">

                Register now for only

                <span className="font-semibold">
                  {" "}
                  ${result.price}/year
                </span>

              </p>

              <div className="mt-6">

                <Button
                  onClick={handleAddDomain}
                >
                  Add Domain To Cart
                </Button>

              </div>

            </div>
          ) : (
            <div className="flex items-center gap-3 text-red-700">

              <XCircle size={24} />

              <div>

                <h3 className="font-bold text-lg break-all">
                  {result.domain} is already taken
                </h3>

                <p className="text-sm mt-1">
                  Try another domain extension.
                </p>

              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}