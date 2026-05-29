import { useMemo } from "react";
import Container from "../../common/Container";
import Button from "../../ui/Button";
import useCart from "../../../hooks/useCart";

export default function Results({ results }) {

  const { addToCart, cart } = useCart();

  const cartMap = useMemo(() => {
    return new Set(cart.map((item) => item.id?.toLowerCase()));
  }, [cart]);

  if (!results?.length) {
    return (
      <p className="text-center text-gray-400 py-12">
        No domains found
      </p>
    );
  }

  const handleAdd = (domain) => {
    addToCart({
      id: domain.name,
      type: "domain",
      name: domain.name,
      price: domain.price,
    });
  };

  return (
    <section className="py-16 bg-[#0F172A]">

      <Container>

        <h2 className="text-3xl font-bold mb-8 text-white">
          Available Domains
        </h2>

        <div className="space-y-5">

          {results.map((domain) => {

            const isInCart = cartMap.has(domain.name?.toLowerCase());
            const isBest = domain.name?.endsWith(".com");
            const isAvailable = domain?.available ?? false;

            return (

              <div
                key={domain.name}
                className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                ${
                  isBest
                    ? "border-indigo-500 bg-[#111827]"
                    : "border-gray-800 bg-[#111827]"
                }`}
              >

                {/* LEFT */}
                <div>

                  <p className="font-semibold text-lg text-white">
                    {domain.name}
                  </p>

                  <p className={`text-sm mt-1 ${
                    isAvailable ? "text-green-400" : "text-red-400"
                  }`}>
                    {isAvailable ? "Available" : "Taken"}
                  </p>

                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4 mt-4 sm:mt-0">

                  <span className="text-xl font-bold text-white">
                    ${domain.price}
                  </span>

                  {isAvailable ? (
                    <Button
                      onClick={() => handleAdd(domain)}
                      disabled={isInCart}
                      className={
                        isInCart
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }
                    >
                      {isInCart ? "Added" : "Buy Now"}
                    </Button>
                  ) : (
                    <span className="text-red-400 text-sm">
                      Not Available
                    </span>
                  )}

                </div>

              </div>

            );
          })}

        </div>

      </Container>

    </section>
  );
}