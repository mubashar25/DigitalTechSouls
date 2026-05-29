import Container from "../../common/Container";

export default function Trust() {

  const stats = [
    {
      value: "99.9%",
      label: "Uptime Guarantee",
      icon: "⚡",
    },
    {
      value: "10K+",
      label: "Active Users",
      icon: "👥",
    },
    {
      value: "24/7",
      label: "Expert Support",
      icon: "💬",
    },
    {
      value: "Fast",
      label: "Server Performance",
      icon: "🚀",
    },
  ];

  return (
    <section className="relative py-24 bg-[#F8FAFC] overflow-hidden">

      {/* glow */}
      <div className="absolute top-[-120px] left-[-100px] w-[300px] h-[300px] bg-indigo-500/10 blur-3xl rounded-full"></div>

      <Container>

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">

          <p className="inline-block bg-indigo-500/10 text-indigo-600 px-4 py-1 rounded-full text-sm font-medium">
            Trusted Worldwide
          </p>

          <h2 className="mt-5 text-3xl md:text-5xl font-bold text-gray-900">
            Trusted by Thousands of Businesses
          </h2>

          <p className="mt-4 text-gray-500 text-lg">
            Reliable hosting and web solutions trusted by startups, developers and growing brands.
          </p>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">

          {stats.map((item) => (

            <div
              key={item.label}
              className="group relative p-8 rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden"
            >

              {/* glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition"></div>

              {/* icon */}
              <div className="relative z-10 w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white flex items-center justify-center text-2xl shadow-lg">
                {item.icon}
              </div>

              {/* value */}
              <h3 className="relative z-10 mt-6 text-3xl font-bold text-gray-900 text-center">
                {item.value}
              </h3>

              {/* label */}
              <p className="relative z-10 mt-2 text-sm text-gray-500 text-center">
                {item.label}
              </p>

            </div>

          ))}

        </div>

      </Container>

    </section>
  );
}