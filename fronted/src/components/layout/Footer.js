import { Link } from "react-router-dom";

import {
  Globe,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function Footer() {

  const footerSections = [
    {
      title: "Hosting",
      links: [
        {
          label: "Shared Hosting",
          path: "/hosting/shared",
        },
        {
          label: "Cloud Hosting",
          path: "/hosting/cloud",
        },
        {
          label: "VPS Hosting",
          path: "/hosting/vps",
        },
        {
          label: "Business Hosting",
          path: "/hosting/business",
        },
      ],
    },

    {
      title: "Domains",
      links: [
        {
          label: ".com Domains",
          path: "/domains",
        },
        {
          label: ".pk Domains",
          path: "/domains/pk",
        },
        {
          label: "WHOIS Lookup",
          path: "/whois",
        },
        {
          label: "Domain Transfer",
          path: "/domain-transfer",
        },
      ],
    },

    {
      title: "Company",
      links: [
        {
          label: "About Us",
          path: "/about",
        },
        {
          label: "Contact",
          path: "/contact",
        },
        {
          label: "Privacy Policy",
          path: "/privacy-policy",
        },
        {
          label: "Terms & Conditions",
          path: "/terms",
        },
      ],
    },
  ];

  return (
    <footer className="bg-[#0B1220] text-gray-400 mt-24 border-t border-white/5">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-20">

        {/* ================================================= */}
        {/* 🔥 TOP GRID */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* ================================================= */}
          {/* 🟣 BRAND */}
          {/* ================================================= */}

          <div className="lg:col-span-2">

            {/* LOGO */}
            <Link
              to="/"
              className="inline-flex items-center gap-2"
            >

              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg">

                <Globe size={22} />

              </div>

              <h2 className="text-2xl font-bold text-white">

                DigitalTech
                <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Souls
                </span>

              </h2>

            </Link>

            {/* DESCRIPTION */}
            <p className="mt-5 text-sm leading-relaxed max-w-md text-gray-400">

              Fast, secure and scalable hosting,
              domains and web infrastructure
              solutions for startups, developers
              and modern businesses worldwide.

            </p>

            {/* CTA */}
            <Link
              to="/hosting"
              className="inline-flex items-center gap-2 mt-7 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-lg hover:scale-[1.02] hover:opacity-95 transition"
            >

              Get Started

              <ArrowRight size={16} />

            </Link>

            {/* CONTACT */}
            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3 text-sm">

                <Mail
                  size={16}
                  className="text-cyan-400"
                />

                <span>
                  support@digitaltechsouls.com
                </span>

              </div>

              <div className="flex items-center gap-3 text-sm">

                <Phone
                  size={16}
                  className="text-cyan-400"
                />

                <span>
                  +92 300 0000000
                </span>

              </div>

              <div className="flex items-center gap-3 text-sm">

                <MapPin
                  size={16}
                  className="text-cyan-400"
                />

                <span>
                  Pakistan
                </span>

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* 🔵 LINKS */}
          {/* ================================================= */}

          {footerSections.map((section) => (

            <div key={section.title}>

              <h3 className="text-white font-semibold mb-5 text-lg">
                {section.title}
              </h3>

              <ul className="space-y-4 text-sm">

                {section.links.map((link) => (

                  <li key={link.label}>

                    <Link
                      to={link.path}
                      className="hover:text-white transition duration-200 flex items-center gap-2 group"
                    >

                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 opacity-70 group-hover:opacity-100 transition" />

                      {link.label}

                    </Link>

                  </li>
                ))}

              </ul>

            </div>
          ))}

        </div>

        {/* ================================================= */}
        {/* 🔥 NEWSLETTER */}
        {/* ================================================= */}

        <div className="mt-16 border-t border-white/10 pt-10">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <h3 className="text-white text-xl font-semibold">
                Join Our Newsletter
              </h3>

              <p className="text-sm text-gray-400 mt-2">
                Get hosting offers, updates and tech news.
              </p>

            </div>

            {/* FORM */}
            <form className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

              <input
                type="email"
                placeholder="Enter your email"
                className="bg-[#111827] border border-white/10 text-white px-5 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 sm:w-[320px]"
              />

              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-2xl font-medium hover:opacity-90 transition"
              >
                Subscribe
              </button>

            </form>

          </div>

        </div>

        {/* ================================================= */}
        {/* 🔥 BOTTOM */}
        {/* ================================================= */}

        <div className="mt-14 border-t border-[#1E293B] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">

          <p className="text-center md:text-left">
            © {new Date().getFullYear()} DigitalTechSouls.
            All rights reserved.
          </p>

          <div className="flex items-center gap-5">

            <Link
              to="/privacy-policy"
              className="hover:text-white transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:text-white transition"
            >
              Terms
            </Link>

            <Link
              to="/contact"
              className="hover:text-white transition"
            >
              Support
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}