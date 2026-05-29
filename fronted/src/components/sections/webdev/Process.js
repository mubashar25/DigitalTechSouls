import Container from "../../common/Container";

export default function Process() {
  const steps = [
    {
      title: "1. Planning",
      desc: "We understand your business goals, audience, and requirements in detail.",
      icon: "🧠",
    },
    {
      title: "2. Design",
      desc: "We craft modern, clean, and user-friendly UI/UX designs.",
      icon: "🎨",
    },
    {
      title: "3. Development",
      desc: "We build fast, scalable, and optimized React applications.",
      icon: "⚙️",
    },
    {
      title: "4. Launch",
      desc: "We deploy your website with full optimization and performance checks.",
      icon: "🚀",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">

      <Container>

        {/* 🔥 HEADING */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How We Work
          </h2>

          <p className="mt-3 text-gray-500">
            A simple, structured process to turn your idea into a real product
          </p>
        </div>

        {/* 🔥 STEPS */}
        <div className="grid md:grid-cols-4 gap-6 mt-14">

          {steps.map((step) => (
            <div
              key={step.title}
              className="p-6 bg-white border border-gray-200 rounded-xl text-center hover:shadow-lg transition"
            >

              <div className="text-3xl mb-3">
                {step.icon}
              </div>

              <h3 className="font-semibold text-gray-900">
                {step.title}
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                {step.desc}
              </p>

            </div>
          ))}

        </div>

      </Container>

    </section>
  );
}