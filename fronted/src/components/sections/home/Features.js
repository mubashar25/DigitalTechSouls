import Container from "../../common/Container";

export default function Features() {

  const features = [
    {
      title: "Lightning Fast Speed",
      desc: "Optimized servers ensure your website loads in milliseconds.",
      icon: "⚡",
    },
    {
      title: "Top-Level Security",
      desc: "Advanced protection keeps your data safe 24/7.",
      icon: "🔒",
    },
    {
      title: "24/7 Expert Support",
      desc: "Our team is always available to help you anytime.",
      icon: "💬",
    },
  ];

  return (
    <section className="py-24 bg-[#0F172A] relative overflow-hidden">

      {/* subtle background glow */}
      <div className="absolute top-[-120px] left-[-100px] w-[400px] h-[400px] bg-indigo-500/10 blur-3xl rounded-full"></div>

      <Container>

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">

          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Why Choose Us
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Built for speed, security and reliability
          </p>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {features.map((f) => (

            <div
              key={f.title}
              className="group relative p-8 rounded-2xl border border-gray-800 bg-[#111827] transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/40 overflow-hidden"
            >

              {/* glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition"></div>

              {/* ICON */}
              <div className="relative z-10 flex justify-center">

                <div className="w-16 h-16 rounded-2xl bg-[#1E293B] border border-gray-700 flex items-center justify-center text-3xl">
                  {f.icon}
                </div>

              </div>

              {/* TITLE */}
              <h3 className="relative z-10 text-xl font-semibold text-white mt-6 text-center group-hover:text-indigo-400 transition">
                {f.title}
              </h3>

              {/* DESC */}
              <p className="relative z-10 text-gray-400 mt-4 leading-relaxed text-center">
                {f.desc}
              </p>

            </div>

          ))}

        </div>

      </Container>

    </section>
  );
}