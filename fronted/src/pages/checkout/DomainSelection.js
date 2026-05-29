import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, ShieldCheck, CheckCircle2 } from "lucide-react";

import Container from "../../components/common/Container";
import Button from "../../components/ui/Button";

import useCart from "../../hooks/useCart";

import DomainOptions from "../../components/sections/checkout/DomainOptions";
import DomainSearch from "../../components/sections/checkout/DomainSearch";
import ExistingDomainForm from "../../components/sections/checkout/ExistingDomainForm";
import TransferDomainForm from "../../components/sections/checkout/TransferDomainForm";

export default function DomainSelection() {
  const navigate = useNavigate();
  const { cart = [], total = 0, cartCount = 0 } = useCart();

  const [selectedOption, setSelectedOption] = useState("register");

  // 🧠 HOSTING ITEM
  const hostingItem = useMemo(
    () => cart.find((item) => item.type === "hosting"),
    [cart]
  );

  // 🧠 DOMAIN ITEM
  const domainItem = useMemo(
    () =>
      cart.find(
        (item) =>
          item.type === "domain" ||
          item.type === "existing-domain" ||
          item.type === "domain-transfer"
      ),
    [cart]
  );

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <Container>

        {/* HEADER */}
        <div className="max-w-3xl flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Globe size={28} />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Choose Your Domain
            </h1>

            <p className="text-gray-500 mt-2 leading-relaxed">
              Register, connect, or transfer your domain easily.
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-3 gap-10 mt-12">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            <DomainOptions
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />

            {selectedOption === "register" && <DomainSearch />}
            {selectedOption === "existing" && <ExistingDomainForm />}
            {selectedOption === "transfer" && <TransferDomainForm />}

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            <div className="bg-white border rounded-3xl p-7 shadow-sm sticky top-24">

              <h2 className="text-2xl font-bold text-gray-900">
                Order Summary
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Review your selection
              </p>

              <div className="mt-8 space-y-5">

                {/* HOSTING */}
                {hostingItem && (
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {hostingItem.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Hosting plan
                      </p>
                    </div>
                    <span className="font-semibold">
                      ${Number(hostingItem.price || 0).toFixed(2)}
                    </span>
                  </div>
                )}

                {/* DOMAIN */}
                {domainItem && (
                  <div className="flex justify-between border-t pt-5">
                    <div>
                      <h3 className="font-semibold text-gray-900 break-all">
                        {domainItem.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {domainItem.type}
                      </p>
                    </div>

                    <span className="font-semibold">
                      ${Number(domainItem.price || 0).toFixed(2)}
                    </span>
                  </div>
                )}

                {/* TOTAL */}
                <div className="border-t pt-5 flex justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">Total</h3>
                    <p className="text-sm text-gray-500">
                      {cartCount} item{cartCount !== 1 && "s"}
                    </p>
                  </div>

                  <span className="text-3xl font-bold text-gray-900">
                    ${Number(total).toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                className="w-full mt-8"
                onClick={() => navigate("/cart")}
              >
                Continue To Cart
              </Button>

              {/* TRUST */}
              <div className="mt-8 border-t pt-6 space-y-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-green-600" />
                  Secure management
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-blue-600" />
                  Instant activation
                </div>

                <div className="flex items-center gap-2">
                  <Globe size={18} className="text-indigo-600" />
                  Global DNS support
                </div>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}