import Container from "../../common/Container";

export default function Features() {

  const features = [
    {
      title: "Fast Performance",
      desc: "Lightning-fast servers optimized for speed, scalability, and uptime.",
      icon: "⚡",
    },
    {
      title: "Secure Hosting",
      desc: "Enterprise-grade protection with free SSL, firewall, and DDoS protection.",
      icon: "🔒",
    },
    {
      title: "24/7 Support",
      desc: "Our expert support team is always available to help you anytime.",
      icon: "💬",
    },
  ];

  return (
    <section className="py-24 bg-[#0F172A]">

      <Container>

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Hosting Features
          </h2>
          <p className="text-gray-400 mt-3">
            Everything you need for a powerful, scalable website
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {features.map((f) => (

            <div
              key={f.title}
              className="group relative p-8 rounded-2xl border border-gray-800 bg-[#111827] text-center transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/40 overflow-hidden"
            >

              {/* glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition"></div>

              {/* ICON */}
              <div className="relative z-10 text-4xl mb-4 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>

              {/* TITLE */}
              <h3 className="relative z-10 text-lg font-semibold text-white">
                {f.title}
              </h3>

              {/* DESC */}
              <p className="relative z-10 text-sm text-gray-400 mt-3 leading-relaxed">
                {f.desc}
              </p>

            </div>

          ))}

        </div>

      </Container>
    </section>
  );
}