import {
  useEffect,
  useState,
} from "react";

import Container from "../../components/common/Container";
import EmptyState from "../../components/dashboard/EmptyState";

import {
  getMyHostingAPI,
} from "../../services/hostingService";

export default function MyServices() {

  const [services, setServices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ========================================
  // 🔥 LOAD SERVICES
  // ========================================
  useEffect(() => {

    const fetchServices =
      async () => {

        try {

          const res =
            await getMyHostingAPI();

          setServices(
            res?.data?.services || []
          );

        } catch (err) {

          setError(
            err?.message ||
              "Failed to load services"
          );

        } finally {

          setLoading(false);

        }
      };

    fetchServices();

  }, []);

  // ========================================
  // 🔥 LOADING
  // ========================================
  if (loading) {
    return (
      <section className="py-16 min-h-screen bg-gray-50 flex items-center justify-center">

        <p className="text-gray-500">
          Loading services...
        </p>

      </section>
    );
  }

  // ========================================
  // 🔥 EMPTY
  // ========================================
  if (!services.length) {
    return (
      <div className="py-16 min-h-screen flex items-center justify-center bg-gray-50">

        <EmptyState
          title="No Hosting Services"
          subtitle="Buy a hosting plan to start your online journey"
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
            My Hosting Services
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Manage hosting plans,
            renewals and server details
          </p>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">

            {error}

          </div>
        )}

        {/* SERVICES */}
        <div className="space-y-5">

          {services.map(
            (service) => {

              const expiryDate =
                service?.expiryDate
                  ? new Date(
                      service.expiryDate
                    ).toLocaleDateString()
                  : "N/A";

              return (
                <div
                  key={service._id}
                  className="p-6 border rounded-2xl bg-white shadow-sm hover:shadow-md transition flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5"
                >

                  {/* LEFT */}
                  <div>

                    <h2 className="text-xl font-semibold text-gray-900">
                      {
                        service.planName
                      }
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Domain:
                      {" "}
                      {
                        service.domainName
                      }
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Billing:
                      {" "}
                      {
                        service.billingCycle
                      }
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                      Expires:
                      {" "}
                      {expiryDate}
                    </p>

                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col lg:items-end gap-3">

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium capitalize
                      ${
                        service.status ===
                        "active"
                          ? "bg-green-100 text-green-700"
                          : service.status ===
                            "expired"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {
                        service.status
                      }
                    </span>

                    <button className="px-4 py-2 rounded-lg bg-black text-white text-sm hover:opacity-90 transition">

                      Manage Service

                    </button>

                  </div>

                </div>
              );
            }
          )}

        </div>

      </Container>

    </section>
  );
}