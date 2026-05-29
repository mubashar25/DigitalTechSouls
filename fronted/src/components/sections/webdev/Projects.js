import Container from "../../common/Container";
import Button from "../../ui/Button";
import projectsData from "../../../data/projectsData";

export default function Projects() {
  if (!projectsData?.length) return null;

  return (
    <section className="py-20 bg-white">

      <Container>

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Recent Work
          </h2>

          <p className="text-gray-500 mt-3">
            A selection of projects that showcase our expertise in building modern and high-performing websites.
          </p>

        </div>

        {/* PROJECTS */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {projectsData.map((project) => (
            <div
              key={project.title}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >

              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-52 object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6">

                <h3 className="text-lg font-semibold text-gray-900">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  {project.desc}
                </p>

                {/* TECH STACK */}
                <div className="flex flex-wrap gap-2 mt-4">

                  {project.tech?.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}

                </div>

                {/* ACTIONS */}
                <div className="mt-5 flex items-center gap-5 text-sm">

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    View Live
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Source Code
                  </a>

                </div>

              </div>

            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="text-center mt-14">

          <p className="text-gray-600 mb-5">
            Want a modern website for your business?
          </p>

          <Button size="lg">
            Start Your Project
          </Button>

        </div>

      </Container>

    </section>
  );
}