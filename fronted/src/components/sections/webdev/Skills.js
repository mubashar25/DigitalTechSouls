import Container from "../../common/Container";
import skillsData from "../../../data/skillsData";

export default function Skills() {
  if (!skillsData?.length) return null;

  return (
    <section className="py-20 bg-gray-50">

      <Container>

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Technologies We Use
          </h2>

          <p className="text-gray-500 mt-3">
            Modern tools & technologies we use to build scalable products
          </p>

        </div>

        {/* SKILLS */}
        <div className="flex flex-wrap justify-center gap-4 mt-12 max-w-5xl mx-auto">

          {skillsData.map((skill) => (
            <span
              key={skill}
              className="
                px-5 py-2
                bg-white
                border border-gray-200
                rounded-full
                text-sm font-medium text-gray-700
                shadow-sm
                hover:border-blue-500
                hover:shadow-lg
                hover:-translate-y-1
                hover:scale-105
                transition-all duration-300
              "
            >
              {skill}
            </span>
          ))}

        </div>

      </Container>

    </section>
  );
}