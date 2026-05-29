import { Link } from "react-router-dom";
import Container from "../../common/Container";
import servicesData from "../../../data/servicesData";
import Button from "../../ui/Button";

export default function Services() {
  if (!servicesData?.length) return null;

  return (
    <section className="py-20 bg-gray-50">

      <Container>

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Web Development Services
          </h2>

          <p className="text-gray-500 mt-3">
            We build modern, scalable, and high-performing websites tailored for your business needs.
          </p>

        </div>

        {/* SERVICES */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {servicesData.map((service) => (
            <div
              key={service.title}
              className="p-8 bg-white border border-gray-200 rounded-2xl text-center hover:border-blue-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >

              {/* ICON */}
              <div className="text-4xl mb-5">
                {service.icon || "💻"}
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-gray-900">
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                {service.desc}
              </p>

            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="text-center mt-14">

          <Link to="/contact">
            <Button
              size="lg"
              className="hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Button>
          </Link>

        </div>

      </Container>

    </section>
  );
}