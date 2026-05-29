import Container from "../../common/Container";

export default function Trust() {
  const stats = [
    {
      value: "50+",
      label: "Projects Completed",
    },
    {
      value: "20+",
      label: "Happy Clients",
    },
    {
      value: "2+",
      label: "Years Experience",
    },
    {
      value: "24/7",
      label: "Support",
    },
  ];

  return (
    <section className="py-20 bg-white">

      <Container>

        {/* 🔥 HEADING */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Trusted by Clients Worldwide
          </h2>

          <p className="mt-3 text-gray-500">
            Proven results, real experience, and reliable support
          </p>
        </div>

        {/* 🔥 STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mt-12">

          {stats.map((item) => (
            <div
              key={item.label}
              className="p-6 rounded-xl border border-gray-100 bg-gray-50 hover:shadow-md transition"
            >
              <h3 className="text-3xl font-bold text-gray-900">
                {item.value}
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </Container>

    </section>
  );
}