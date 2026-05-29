import Container from "../../common/Container";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative bg-[#0B1220] py-28 overflow-hidden">

      {/* GLOW EFFECTS */}
      <div className="absolute top-[-150px] left-[-120px] w-[500px] h-[500px] bg-indigo-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[450px] h-[450px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      <Container>
        <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">

          {/* LEFT */}
          <div>

            {/* BADGE */}
            <p className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-4 py-1 rounded-full text-sm font-medium">
              🚀 Modern Hosting & Web Solutions
            </p>

            {/* HEADING */}
            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight text-white">
              Build, Host & Launch Your Website in Minutes
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-6 text-gray-300 text-lg leading-relaxed max-w-xl">
              Fast, secure and scalable hosting with premium web development solutions.
              Perfect for startups, agencies and developers.
            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">

              <Link to="/hosting">
                <Button className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.03] transition px-7 py-3 rounded-xl">
                  Get Started
                </Button>
              </Link>

              <Link to="/pricing">
                <Button className="border border-gray-700 text-white hover:bg-white/10 px-7 py-3 rounded-xl transition">
                  View Pricing
                </Button>
              </Link>

            </div>

            {/* TRUST */}
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-gray-400">
              <span>⭐ 99.9% Uptime</span>
              <span>•</span>
              <span>🔒 Free SSL</span>
              <span>•</span>
              <span>⚡ 24/7 Support</span>
            </div>

          </div>

          {/* RIGHT */}
          <div className="flex justify-center relative">

            <div className="relative">

              <img
                src="https://cdn.pixabay.com/photo/2016/10/11/21/43/geometric-1732847_1280.jpg"
                alt="hero"
                className="w-full max-w-lg rounded-3xl shadow-2xl border border-gray-800"
              />

              {/* FLOATING CARD */}
              <div className="absolute -bottom-6 -left-6 bg-[#111827] border border-gray-700 shadow-xl rounded-2xl px-5 py-4 text-sm text-white backdrop-blur-md">
                ⚡ 1-Click Deployment
              </div>

            </div>

          </div>

        </div>
      </Container>

    </section>
  );
}