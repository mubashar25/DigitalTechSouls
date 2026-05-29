import Container from "../../common/Container";

export default function Testimonials() {

  const testimonials = [
    {
      name: "Ali Ahmed",
      role: "Startup Founder",
      text: "Amazing service! My website loads super fast and support is excellent.",
    },
    {
      name: "Sara Khan",
      role: "E-commerce Owner",
      text: "Best hosting experience ever. Very reliable and easy to use.",
    },
    {
      name: "John Doe",
      role: "Freelancer",
      text: "Perfect solution for my clients. Highly recommended!",
    },
  ];

  return (
    <section className="relative py-28 bg-[#0F172A] overflow-hidden">

      {/* glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-3xl rounded-full"></div>

      <Container>

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">

          <h2 className="text-3xl md:text-5xl font-bold text-white">
            What Clients Say
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Real feedback from real customers
          </p>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {testimonials.map((t) => (

            <div
              key={t.name}
              className="group relative p-8 rounded-2xl border border-gray-800 bg-[#111827] transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/40 overflow-hidden"
            >

              {/* glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition"></div>

              {/* quote */}
              <div className="relative z-10 text-indigo-500 text-5xl leading-none">
                “
              </div>

              {/* text */}
              <p className="relative z-10 text-gray-400 leading-relaxed mt-4">
                {t.text}
              </p>

              {/* user */}
              <div className="relative z-10 mt-8 flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white flex items-center justify-center font-bold shadow-lg">
                  {t.name.charAt(0)}
                </div>

                <div>
                  <h4 className="font-semibold text-white">{t.name}</h4>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>

              </div>

            </div>

          ))}

        </div>

      </Container>

    </section>
  );
}