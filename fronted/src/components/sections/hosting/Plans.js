import Container from "../../common/Container";
import Button from "../../ui/Button";
import useCart from "../../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Plans() {

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const plans = [
    {
      id: "hosting_basic",
      name: "Basic",
      price: 2.99,
      displayPrice: "3500PKR",
      sub: "/year",
      features: [
       "24/7 Support",
        "Disk Space: 20GB",
        "Bandwidth: 300GB",
        "Host Websites: 03",
        "MySQL Database: 05",
        "Email Account: 15",
        "99.9% Uptime Guamtse",
        "Free SSL Certificate"
      ],
    },
    {
      id: "hosting_premium",
      name: "Standard",
      price: 5.99,
      displayPrice: "4200PKR",
      sub: "/year",
      features: ["24/7 Support",
        "Disk Space: 50GB",
        "Bandwidth: 500GB",
        "Host Websites: 05",
        "MySQL Database: 10",
        "Email Account: 20",
        "99.9% Uptime Guamtse",
        "Free SSL Certificate"],
      popular: true,
    },
    {
      id: "hosting_business",
      name: "Premium",
      price: 9.99,
      displayPrice: "5000PKR",
      sub: "/year",
      features: ["24/7 Support",
        "Disk Space: 100GB",
        "Bandwidth: 1000GB",
        "Host Websites: 10",
        "MySQL Database: 15",
        "Email Account: 50",
        "99.9% Uptime Guamtse",
        "Free SSL Certificate"],
    },
  ];

  const handleAddToCart = (plan) => {
    addToCart({
      id: plan.id,
      type: "hosting",
      name: `${plan.name} Plan`,
      price: plan.price,
      billingCycle: "monthly",
    });

    toast.success(`${plan.name} Plan added to cart`);
    navigate("/cart");
  };

  return (
    <section className="py-24 bg-[#0F172A]">

      <Container>

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            Choose Your Hosting Plan
          </h1>
          <p className="text-gray-400 mt-3">
            Start small, scale anytime. No hidden charges.
          </p>
        </div>

        {/* PLANS */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {plans.map((plan) => (

            <div
              key={plan.id}
              className={`relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2 overflow-hidden
                ${
                  plan.popular
                    ? "bg-[#111827] border-indigo-500 shadow-2xl scale-105"
                    : "bg-[#111827] border-gray-800 hover:border-indigo-500/40"
                }
              `}
            >

              {/* GLOW */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 opacity-0 hover:opacity-100 transition"></div>

              {/* BADGE */}
              {plan.popular && (
                <span className="absolute top-4 right-4 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              {/* NAME */}
              <h2 className="text-xl font-semibold text-white relative z-10">
                {plan.name}
              </h2>

              {/* PRICE */}
              <div className="mt-4 flex items-end gap-1 relative z-10">
                <span className="text-4xl font-bold text-white">
                  {plan.displayPrice}
                </span>
                <span className="text-gray-400 mb-1">{plan.sub}</span>
              </div>

              {/* FEATURES */}
              <ul className="mt-6 space-y-3 text-sm relative z-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                    <span className="text-green-400">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* BUTTON */}
              <div className="mt-8 relative z-10">
                <Button
                  className="w-full"
                  variant={plan.popular ? "primary" : "secondary"}
                  onClick={() => handleAddToCart(plan)}
                >
                  Get Started
                </Button>
              </div>

            </div>

          ))}

        </div>

      </Container>
    </section>
  );
}