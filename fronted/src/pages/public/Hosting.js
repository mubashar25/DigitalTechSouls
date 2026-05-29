import Plans from "../../components/sections/hosting/Plans";
import Features from "../../components/sections/hosting/Features";
import Comparison from "../../components/sections/hosting/Comparison";

import Container from "../../components/common/Container";

export default function Hosting() {

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24">

        <Container>

          <div className="max-w-3xl">

            <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-medium mb-5">

              🚀 Fast & Secure Web Hosting

            </span>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">

              Premium Hosting
              For Modern Websites

            </h1>

            <p className="mt-6 text-lg text-blue-100 leading-relaxed">

              Launch your website with high-performance hosting,
              free SSL certificates, domain management and
              24/7 support.

            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <a
                href="#plans"
                className="px-6 py-3 rounded-xl bg-white text-blue-700 font-semibold hover:bg-gray-100 transition text-center"
              >
                View Hosting Plans
              </a>

              <a
                href="/contact"
                className="px-6 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition text-center"
              >
                Contact Sales
              </a>

            </div>

          </div>

        </Container>

      </section>

      {/* PLANS */}
      <section
        id="plans"
        className="py-16"
      >

        <Plans />

      </section>

      {/* FEATURES + COMPARISON */}
      <Container className="space-y-24 py-16">

        <Features />
        <Comparison />

      </Container>

      {/* TRUST SECTION */}
      <section className="py-20 bg-white border-t">

        <Container>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-gray-50 border rounded-2xl p-6">

              <h3 className="text-xl font-bold text-gray-900">
                ⚡ Lightning Fast
              </h3>

              <p className="text-gray-500 mt-3 leading-relaxed">
                SSD-powered servers optimized for maximum speed and uptime.
              </p>

            </div>

            <div className="bg-gray-50 border rounded-2xl p-6">

              <h3 className="text-xl font-bold text-gray-900">
                🔒 Secure Hosting
              </h3>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Free SSL certificates, backups and advanced protection included.
              </p>

            </div>

            <div className="bg-gray-50 border rounded-2xl p-6">

              <h3 className="text-xl font-bold text-gray-900">
                🌍 Global Availability
              </h3>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Reliable hosting infrastructure with worldwide connectivity.
              </p>

            </div>

          </div>

        </Container>

      </section>

    </main>
  );
}