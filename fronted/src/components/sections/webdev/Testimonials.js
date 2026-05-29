import Container from "../../common/Container";

export default function Testimonials() {
  const reviews = [
    {
      name: "Ali Khan",
      role: "Startup Founder",
      text: "Amazing work! My website looks professional, fast, and performs really well.",
      rating: 5,
    },
    {
      name: "Sarah Ahmed",
      role: "Business Owner",
      text: "Very smooth experience. Clean design and excellent communication throughout.",
      rating: 5,
    },
    {
      name: "John Smith",
      role: "Freelancer",
      text: "Highly recommended! Delivered exactly what I needed on time.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-white">

      <Container>

        {/* 🔥 HEADING */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Clients Say
          </h2>

          <p className="mt-3 text-gray-500">
            Real feedback from satisfied clients
          </p>
        </div>

        {/* 🔥 REVIEWS */}
        <div className="grid md:grid-cols-3 gap-8 mt-14">

          {reviews.map((r) => (
            <div
              key={r.name}
              className="p-6 bg-gray-50 border border-gray-200 rounded-xl hover:shadow-lg transition"
            >

              {/* ⭐ STARS */}
              <div className="text-yellow-500 text-sm mb-3">
                {"⭐".repeat(r.rating)}
              </div>

              {/* TEXT */}
              <p className="text-gray-600 text-sm leading-relaxed">
                “{r.text}”
              </p>

              {/* NAME */}
              <div className="mt-5">
                <p className="font-semibold text-gray-900">
                  {r.name}
                </p>
                <p className="text-xs text-gray-500">
                  {r.role}
                </p>
              </div>

            </div>
          ))}

        </div>

      </Container>

    </section>
  );
}