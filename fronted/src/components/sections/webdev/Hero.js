import { Link } from "react-router-dom";
import Container from "../../common/Container";
import Button from "../../ui/Button";

export default function Hero() {
  const stats = [
    { value: "50+", label: "Projects Completed" },
    { value: "10+", label: "Happy Clients" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">

      <Container>

        <div className="text-center max-w-3xl mx-auto">

          {/* HEADLINE */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            We Build High-Converting Websites for Your Business 🚀
          </h1>

          {/* SUBTEXT */}
          <p className="mt-5 text-gray-600 text-lg">
            Modern, fast, and scalable web solutions designed to grow your business and increase conversions.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

            <Link to="/contact">
              <Button
                size="lg"
                className="hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Button>
            </Link>

            <Link to="/webdev/projects">
              <Button
                variant="outline"
                size="lg"
                className="hover:scale-105 transition-all duration-300"
              >
                View Portfolio
              </Button>
            </Link>

          </div>

          {/* TRUST STATS */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-gray-500">

            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-bold text-gray-900 text-lg">
                  {stat.value}
                </p>

                <p>{stat.label}</p>
              </div>
            ))}

          </div>

        </div>

      </Container>

    </section>
  );
}