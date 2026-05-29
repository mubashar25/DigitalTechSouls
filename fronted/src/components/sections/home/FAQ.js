import { useState } from "react";
import Container from "../../common/Container";

export default function FAQ() {

  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "What is web hosting?",
      a: "Web hosting is a service that allows your website to be accessible on the internet 24/7 using high-performance servers.",
    },
    {
      q: "Do you provide customer support?",
      a: "Yes, we provide 24/7 expert support to help you with technical and billing issues anytime.",
    },
    {
      q: "Can I upgrade my plan later?",
      a: "Absolutely! You can upgrade or downgrade your hosting plan anytime without downtime.",
    },
  ];

  const toggle = (i) => {
    setOpen(open === i ? null : i);
  };

  return (
    <section className="relative py-28 bg-[#0B1220] overflow-hidden">

      {/* glow */}
      <div className="absolute top-[-120px] right-[-100px] w-[400px] h-[400px] bg-indigo-500/10 blur-3xl rounded-full"></div>

      <Container>

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">

          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Everything you need to know before getting started
          </p>

        </div>

        {/* FAQ LIST */}
        <div className="mt-16 max-w-3xl mx-auto space-y-5">

          {faqs.map((f, i) => {

            const isOpen = open === i;

            return (

              <div
                key={i}
                className="rounded-2xl border border-gray-800 bg-[#111827] overflow-hidden"
              >

                <button
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-white/5 transition"
                >

                  <span className="font-medium text-white text-lg">
                    {f.q}
                  </span>

                  <span
                    className={`text-2xl text-indigo-400 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>

                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 py-5 px-6" : "max-h-0 px-6"
                  }`}
                >

                  <p className="text-gray-400 leading-relaxed">
                    {f.a}
                  </p>

                </div>

              </div>

            );
          })}

        </div>

      </Container>

    </section>
  );
}