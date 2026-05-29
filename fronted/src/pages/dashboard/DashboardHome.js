import {
  useEffect,
  useState,
} from "react";

import Container from "../../components/common/Container";
import StatCard from "../../components/dashboard/StatCard";

import {
  getMyHostingAPI,
} from "../../services/hostingService";

import {
  getMyDomainsAPI,
} from "../../services/domainService";

import {
  getMyOrdersAPI,
} from "../../services/cartService";

export default function DashboardHome() {

  const [stats, setStats] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =========================================
  // 🔥 LOAD DASHBOARD DATA
  // =========================================
  useEffect(() => {

    const loadDashboard =
      async () => {

        try {

          const [
            hostingRes,
            domainsRes,
            ordersRes,
          ] = await Promise.all([
            getMyHostingAPI(),
            getMyDomainsAPI(),
            getMyOrdersAPI(),
          ]);

          const services =
            hostingRes?.data?.services || [];

          const domains =
            domainsRes?.data?.domains || [];

          const orders =
            ordersRes?.data?.orders || [];

          setStats([
            {
              title: "Services",
              value: services.length,
              change: `${services.filter(
                (s) =>
                  s.status === "active"
              ).length} active`,
            },

            {
              title: "Domains",
              value: domains.length,
              change: `${domains.filter(
                (d) =>
                  d.status === "active"
              ).length} active`,
            },

            {
              title: "Orders",
              value: orders.length,
              change: `${orders.filter(
                (o) =>
                  o.status === "completed"
              ).length} completed`,
            },
          ]);

        } catch (err) {

          setError(
            err?.message ||
              "Failed to load dashboard"
          );

        } finally {

          setLoading(false);

        }
      };

    loadDashboard();

  }, []);

  // =========================================
  // 🔥 LOADING
  // =========================================
  if (loading) {
    return (
      <section className="py-16 min-h-screen bg-gray-50 flex items-center justify-center">

        <p className="text-gray-500">
          Loading dashboard...
        </p>

      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 min-h-screen">

      <Container>

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Monitor your hosting,
            domains and order activity
          </p>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl">

            {error}

          </div>
        )}

        {/* STATS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {stats.map((stat) => (

            <div
              key={stat.title}
              className="transition hover:scale-[1.02]"
            >

              <StatCard
                title={stat.title}
                value={stat.value}
                change={stat.change}
              />

            </div>

          ))}

        </div>

      </Container>

    </section>
  );
}
