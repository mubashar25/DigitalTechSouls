import Container from "../../common/Container";
import { Link } from "react-router-dom";

export default function PricingPreview() {

  const plans = [
    {
      name: "Basic",
      price: "3500PKR",
      icon: "🟢",
      desc: "Perfect for starters and personal websites.",
      features: [
        "24/7 Support",
        "Disk Space: 20GB",
        "Bandwidth: 300GB",
        "Host Websites: 03",
        "MySQL Database: 05",
        "Email Account: 15",
        "99.9% Uptime Guamtse",
        "Free SSL Certificate",
      ],
    },

    {
      name: "Standard",
      price: "4200PKR",
      icon: "🔥",
      popular: true,
      desc: "Best value for growing businesses.",
      features: [
        "24/7 Support",
        "Disk Space: 50GB",
        "Bandwidth: 500GB",
        "Host Websites: 05",
        "MySQL Database: 10",
        "Email Account: 20",
        "99.9% Uptime Guamtse",
        "Free SSL Certificate",
      ],
    },

    {
      name: "Premium",
      price: "5000PKR",
      icon: "🚀",
      desc: "Advanced hosting for high traffic websites.",
      features: [
        "24/7 Support",
        "Disk Space: 100GB",
        "Bandwidth: 1000GB",
        "Host Websites: 10",
        "MySQL Database: 15",
        "Email Account: 50",
        "99.9% Uptime Guamtse",
        "Free SSL Certificate",
      ],
    },
  ];

  return (
    <section className="relative py-28 bg-[#F8FAFC] overflow-hidden">

      {/* glow */}
      <div className="absolute top-[-120px] right-[-100px] w-[400px] h-[400px] bg-indigo-500/10 blur-3xl rounded-full"></div>

      <Container>

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto relative z-10">

          <p className="inline-block bg-indigo-500/10 text-indigo-600 px-4 py-1 rounded-full text-sm font-medium">
            Flexible Pricing
          </p>

          <h2 className="mt-5 text-3xl md:text-5xl font-bold text-gray-900">
            Simple & Transparent Pricing
          </h2>

          <p className="mt-4 text-gray-500 text-lg">
            Powerful hosting solutions for startups, businesses and developers.
          </p>

        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 relative z-10">

          {plans.map((plan) => (

            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 overflow-hidden
                ${
                  plan.popular
                    ? "bg-[#0B1220] border border-indigo-500 shadow-2xl scale-105"
                    : "bg-white border border-gray-200 hover:shadow-xl"
                }
              `}
            >

              {/* POPULAR BADGE */}
              {plan.popular && (
                <span className="absolute top-5 right-5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Most Popular
                </span>
              )}

              {/* ICON */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg
                  ${
                    plan.popular
                      ? "bg-white/10 border border-white/10"
                      : "bg-gradient-to-br from-indigo-600 to-cyan-500 text-white"
                  }
                `}
              >
                {plan.icon}
              </div>

              {/* NAME */}
              <h3 className={`mt-6 text-2xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}>
                {plan.name}
              </h3>

              {/* PRICE */}
              <div className="mt-4 flex items-end gap-1">
                <span className={`text-5xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}>
                  {plan.price}
                </span>
                <span className={`mb-1 ${plan.popular ? "text-gray-400" : "text-gray-500"}`}>
                  /year
                </span>
              </div>

              {/* DESC */}
              <p className={`mt-4 leading-relaxed ${plan.popular ? "text-gray-400" : "text-gray-500"}`}>
                {plan.desc}
              </p>

              {/* FEATURES */}
              <div className="mt-8 space-y-4">

                {plan.features.map((feature) => (

                  <div key={feature} className="flex items-center gap-3">

                    <div className="w-5 h-5 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center text-xs">
                      ✔
                    </div>

                    <span className={plan.popular ? "text-gray-300" : "text-gray-600"}>
                      {feature}
                    </span>

                  </div>

                ))}

              </div>

              {/* BUTTON */}
              <Link
                to="/pricing"
                className={`mt-10 inline-flex w-full justify-center py-3 rounded-xl font-semibold transition
                  ${
                    plan.popular
                      ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white hover:opacity-90"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }
                `}
              >
                Get Started
              </Link>

            </div>

          ))}

        </div>

      </Container>

    </section>
  );
}