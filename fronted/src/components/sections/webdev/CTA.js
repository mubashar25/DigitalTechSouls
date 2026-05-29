import { Link } from "react-router-dom";
import Container from "../../common/Container";
import Button from "../../ui/Button";

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl"></div>

      <Container>

        <div className="relative z-10 text-center max-w-3xl mx-auto">

          {/* 🔥 BADGE */}
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur">
            🚀 Let’s Build Something Great
          </span>

          {/* 🔥 HEADING */}
          <h2 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
            Ready to Launch Your Next Website?
          </h2>

          {/* 🔥 SUBTEXT */}
          <p className="mt-5 text-blue-100 text-lg leading-relaxed">
            We create modern, fast, and scalable web experiences
            designed to help your business grow online.
          </p>

          {/* 🔥 BUTTONS */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

            <Link to="/contact">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-gray-100 shadow-lg"
              >
                Get Started Now
              </Button>
            </Link>

            <Link
              to="/projects"
              className="px-6 py-3 rounded-lg border border-white/30 text-white hover:bg-white/10 transition"
            >
              View Portfolio
            </Link>

          </div>

          {/* 🔥 TRUST TEXT */}
          <p className="mt-8 text-sm text-blue-200">
            ⭐ Trusted by startups, freelancers & growing businesses
          </p>

        </div>

      </Container>

    </section>
  );
}