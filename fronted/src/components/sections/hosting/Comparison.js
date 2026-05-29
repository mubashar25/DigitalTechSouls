import Container from "../../common/Container";

export default function Comparison() {

  const plans = ["Basic", "Premium", "Business"];

  const features = [
    { name: "Websites", values: ["1", "100", "Unlimited"] },
    { name: "Storage", values: ["10GB", "50GB", "100GB"] },
    { name: "SSL", values: ["✔", "✔", "✔"] },
    { name: "Support", values: ["Basic", "Priority", "24/7"] },
    { name: "Free Domain", values: ["❌", "✔", "✔"] },
  ];

  return (
    <section className="py-24 bg-[#0B1220]">

      <Container>

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Compare Plans
          </h2>
          <p className="text-gray-400 mt-3">
            Choose the plan that fits your needs
          </p>
        </div>

        {/* TABLE */}
        <div className="mt-14 overflow-x-auto">

          <table className="w-full border border-gray-800 rounded-2xl overflow-hidden">

            {/* HEADER */}
            <thead className="bg-[#111827] text-white">
              <tr>
                <th className="p-5 text-left">Features</th>

                {plans.map((p) => (
                  <th
                    key={p}
                    className={`p-5 text-center ${
                      p === "Premium" ? "text-indigo-400" : "text-gray-300"
                    }`}
                  >
                    {p}
                  </th>
                ))}

              </tr>
            </thead>

            {/* BODY */}
            <tbody>

              {features.map((f) => (
                <tr key={f.name} className="border-t border-gray-800 hover:bg-white/5">

                  <td className="p-5 text-gray-300 font-medium">
                    {f.name}
                  </td>

                  {f.values.map((v, i) => (
                    <td
                      key={i}
                      className={`p-5 text-center ${
                        plans[i] === "Premium"
                          ? "text-indigo-400 font-semibold"
                          : "text-gray-400"
                      }`}
                    >
                      {v}
                    </td>
                  ))}

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </Container>
    </section>
  );
}