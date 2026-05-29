import { useNavigate } from "react-router-dom";

import {
  Globe,
  Link2,
  RefreshCcw,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function DomainOptions({
  selectedOption,
  setSelectedOption,
}) {

  const navigate = useNavigate();

  // =================================================
  // 🔥 HANDLE SELECT
  // =================================================

  const handleSelect = (optionId) => {

    setSelectedOption(optionId);

    // 🌐 REGISTER NEW DOMAIN
    if (optionId === "register") {
      navigate("/domain");
    }
  };

  // =================================================
  // 🔥 OPTIONS
  // =================================================

  const options = [
    {
      id: "register",

      title: "Register New Domain",

      desc:
        "Search and register a brand new domain name for your website.",

      icon: Globe,

      badge: "Popular",

      color:
        "from-blue-500 to-indigo-600",
    },

    {
      id: "existing",

      title: "Use Existing Domain",

      desc:
        "Connect a domain you already own from another provider.",

      icon: Link2,

      color:
        "from-emerald-500 to-green-600",
    },

    {
      id: "transfer",

      title: "Transfer Domain",

      desc:
        "Move your domain to our platform for easier management.",

      icon: RefreshCcw,

      color:
        "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="bg-white border rounded-3xl p-8 shadow-sm">

      {/* ================================================= */}
      {/* 🔥 HEADER */}
      {/* ================================================= */}

      <div>

        <h2 className="text-3xl font-bold text-gray-900">
          Choose Domain Option
        </h2>

        <p className="text-gray-500 mt-3 leading-relaxed max-w-2xl">
          Select how you want to connect your domain
          with your hosting plan. You can register a
          new domain, use an existing one, or transfer
          your current domain to our platform.
        </p>

      </div>

      {/* ================================================= */}
      {/* 🔥 OPTIONS */}
      {/* ================================================= */}

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        {options.map((option) => {

          const Icon = option.icon;

          const active =
            selectedOption === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() =>
                handleSelect(option.id)
              }
              className={`relative overflow-hidden p-6 rounded-3xl border text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl

              ${
                active
                  ? "border-blue-600 bg-blue-50 shadow-lg"
                  : "border-gray-200 bg-white hover:border-blue-200"
              }`}
            >

              {/* ================================================= */}
              {/* 🔥 ACTIVE CHECK */}
              {/* ================================================= */}

              {active && (
                <div className="absolute top-5 right-5 text-blue-600">

                  <CheckCircle2 size={24} />

                </div>
              )}

              {/* ================================================= */}
              {/* 🔥 BADGE */}
              {/* ================================================= */}

              {option.badge && (
                <span className="absolute top-5 left-5 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">

                  {option.badge}

                </span>
              )}

              {/* ================================================= */}
              {/* 🔥 ICON */}
              {/* ================================================= */}

              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${option.color} text-white flex items-center justify-center mt-8 shadow-lg`}
              >

                <Icon size={30} />

              </div>

              {/* ================================================= */}
              {/* 🔥 TITLE */}
              {/* ================================================= */}

              <h3 className="mt-6 text-xl font-bold text-gray-900">

                {option.title}

              </h3>

              {/* ================================================= */}
              {/* 🔥 DESC */}
              {/* ================================================= */}

              <p className="mt-3 text-sm text-gray-500 leading-relaxed">

                {option.desc}

              </p>

              {/* ================================================= */}
              {/* 🔥 FOOTER */}
              {/* ================================================= */}

              <div className="mt-8 flex items-center justify-between">

                <span
                  className={`text-sm font-semibold

                  ${
                    active
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >
                  {active
                    ? "Selected"
                    : "Click to Select"}
                </span>

                <div
                  className={`flex items-center gap-2 text-sm font-medium transition-all

                  ${
                    active
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >

                  Continue

                  <ArrowRight size={16} />

                </div>

              </div>

            </button>
          );
        })}

      </div>

      {/* ================================================= */}
      {/* 🔥 HELP CARD */}
      {/* ================================================= */}

      <div className="mt-10 bg-gradient-to-r from-gray-50 to-blue-50 border rounded-2xl p-6">

        <div className="flex items-start gap-4">

          <div className="text-3xl">
            🌐
          </div>

          <div>

            <h3 className="font-semibold text-gray-900">
              Need Help Choosing?
            </h3>

            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              A domain name is your website address
              (example: yourbusiness.com). Register a
              new domain for a fresh start, connect an
              existing domain, or transfer your domain
              for centralized management.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}