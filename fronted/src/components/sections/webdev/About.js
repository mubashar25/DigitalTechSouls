import Container from "../../common/Container";

export default function About() {
  const features = [
    {
      title: "Fast & Optimized",
      desc: "Lightning-fast websites built for performance and SEO.",
      icon: "⚡",
    },
    {
      title: "Modern Design",
      desc: "Clean, responsive, and user-focused UI/UX design.",
      icon: "🎨",
    },
    {
      title: "Scalable Solutions",
      desc: "Built with modern tech like React for future growth.",
      icon: "🚀",
    },
  ];

  return (
    <section className="py-20 bg-white">

      <Container>

        {/* HEADER */}
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose Us?
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            We don’t just build websites — we create high-performance digital experiences that help your business grow.
          </p>

        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-8 bg-gray-50 border border-gray-200 rounded-2xl text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >

              <div className="text-4xl mb-4">
                {feature.icon}
              </div>

              <h3 className="font-semibold text-lg text-gray-900">
                {feature.title}
              </h3>

              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                {feature.desc}
              </p>

            </div>
          ))}

        </div>

      </Container>

    </section>
  );
}