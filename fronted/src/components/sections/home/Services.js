import Container from "../../common/Container";
import { Link } from "react-router-dom";

export default function Services() {

  const services = [
    {
      icon: "☁️",
      title: "Hosting & Domain",
      desc: "Fast, secure and scalable hosting solutions with free SSL and high uptime.",
      link: "/hosting"
    },
    {
      icon: "💻",
      title: "Web Development",
      desc: "Modern, responsive websites using React & latest technologies.",
      link: "/webdev"
    },
    {
      icon: "🎨",
      title: "Brand Identity",
      desc: "Professional logos and complete brand identity systems.",
      link: "/services"
    },
    {
      icon: "📢",
      title: "Marketing",
      desc: "Grow your business with social media and digital marketing.",
      link: "/services"
    }
  ];

  return (
    <section className="py-24 bg-[#0F172A]">

      <Container>

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Our Services
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Everything you need to build and scale your online business
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {services.map((s) => (

            <Link
              key={s.title}
              to={s.link}
              className="group relative p-8 rounded-2xl border border-gray-800 bg-[#111827] hover:border-indigo-500/40 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >

              {/* GLOW */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition"></div>

              {/* ICON */}
              <div className="relative z-10 text-3xl bg-indigo-500/10 border border-indigo-500/20 w-fit p-4 rounded-xl">
                {s.icon}
              </div>

              {/* TITLE */}
              <h3 className="relative z-10 text-xl font-semibold mt-6 text-white group-hover:text-indigo-400 transition">
                {s.title}
              </h3>

              {/* DESC */}
              <p className="relative z-10 text-gray-400 mt-4 leading-relaxed">
                {s.desc}
              </p>

              {/* LINK */}
              <div className="relative z-10 mt-6 text-indigo-400 font-medium">
                Explore →
              </div>

            </Link>

          ))}

        </div>

      </Container>

    </section>
  );
}