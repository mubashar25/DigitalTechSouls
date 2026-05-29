import {
  useEffect,
  useState,
} from "react";

import Container from "../../components/common/Container";
import EmptyState from "../../components/dashboard/EmptyState";

import {
  getMyDomainsAPI,
} from "../../services/domainService";

export default function Domains() {

  const [domains, setDomains] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =====================================
  // 🔥 LOAD DOMAINS
  // =====================================
  useEffect(() => {

    const fetchDomains =
      async () => {

        try {

          const res =
            await getMyDomainsAPI();

          setDomains(
            res?.data?.domains || []
          );

        } catch (err) {

          setError(
            err?.message ||
              "Failed to load domains"
          );

        } finally {

          setLoading(false);

        }
      };

    fetchDomains();

  }, []);

  // =====================================
  // 🔥 LOADING
  // =====================================
  if (loading) {
    return (
      <section className="py-16 min-h-screen bg-gray-50 flex items-center justify-center">

        <p className="text-gray-500">
          Loading domains...
        </p>

      </section>
    );
  }

  // =====================================
  // 🔥 EMPTY
  // =====================================
  if (!domains.length) {
    return (
      <div className="py-16 min-h-screen flex items-center justify-center bg-gray-50">

        <EmptyState
          title="No Domains Found"
          subtitle="Search and register your first domain"
        />

      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50 min-h-screen">

      <Container>

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            My Domains
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Manage your registered domains
          </p>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">

            {error}

          </div>
        )}

        {/* DOMAINS */}
        <div className="space-y-4">

          {domains.map((domain) => {

            const status =
              domain?.status || "active";

            return (
              <div
                key={domain._id}
                className="p-5 border rounded-lg bg-white shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:shadow-md transition"
              >

                {/* LEFT */}
                <div>

                  <p className="font-semibold text-lg text-gray-900">
                    {domain?.domainName}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Registrar:
                    {" "}
                    {
                      domain?.registrar ||
                      "DigitalTechSouls"
                    }
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Expiry:
                    {" "}
                    {domain?.expiryDate
                      ? new Date(
                          domain.expiryDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>

                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium capitalize
                    ${
                      status === "active"
                        ? "bg-green-100 text-green-600"
                        : status === "expired"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {status}
                  </span>

                </div>

              </div>
            );
          })}

        </div>

      </Container>

    </section>
  );
}