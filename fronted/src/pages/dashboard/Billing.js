import {
  useEffect,
  useState,
} from "react";

import Container from "../../components/common/Container";
import EmptyState from "../../components/dashboard/EmptyState";

import {
  getMyInvoicesAPI,
} from "../../services/invoiceService";

export default function Billing() {

  const [invoices, setInvoices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ========================================
  // 🔥 LOAD BILLING HISTORY
  // ========================================
  useEffect(() => {

    const fetchInvoices =
      async () => {

        try {

          const res =
            await getMyInvoicesAPI();

          setInvoices(
            res?.data?.invoices || []
          );

        } catch (err) {

          setError(
            err?.message ||
              "Failed to load invoices"
          );

        } finally {

          setLoading(false);

        }
      };

    fetchInvoices();

  }, []);

  // ========================================
  // 🔥 LOADING
  // ========================================
  if (loading) {
    return (
      <section className="py-16 min-h-screen bg-gray-50 flex items-center justify-center">

        <p className="text-gray-500">
          Loading billing history...
        </p>

      </section>
    );
  }

  // ========================================
  // 🔥 EMPTY STATE
  // ========================================
  if (!invoices.length) {
    return (
      <div className="py-16 min-h-screen flex items-center justify-center bg-gray-50">

        <EmptyState
          title="No Billing History"
          subtitle="Your invoices and payments will appear here"
        />

      </div>
    );
  }

  // ========================================
  // 💰 TOTAL SPENT
  // ========================================
  const totalSpent =
    invoices.reduce(
      (acc, item) =>
        acc +
        Number(
          item.total || 0
        ),
      0
    );

  return (
    <section className="py-16 bg-gray-50 min-h-screen">

      <Container>

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Billing History
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            View all invoices,
            payments and downloads
          </p>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">

            {error}

          </div>
        )}

        {/* INVOICES */}
        <div className="space-y-4">

          {invoices.map((invoice) => (

            <div
              key={invoice._id}
              className="p-5 border rounded-2xl bg-white shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 hover:shadow-md transition"
            >

              {/* LEFT */}
              <div>

                <h3 className="font-semibold text-lg text-gray-900">
                  {
                    invoice?.order
                      ?.serviceName ||
                    "Hosting Service"
                  }
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Invoice:
                  {" "}
                  {
                    invoice.invoiceNumber
                  }
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {
                    invoice.createdAt
                      ? new Date(
                          invoice.createdAt
                        ).toLocaleDateString()
                      : "N/A"
                  }
                </p>

              </div>

              {/* CENTER */}
              <div className="flex flex-col gap-1">

                <p className="text-sm text-gray-500">
                  Payment Method
                </p>

                <p className="font-medium capitalize">
                  {
                    invoice?.payment
                      ?.paymentMethod ||
                    "N/A"
                  }
                </p>

              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-start lg:items-end gap-3">

                <div>

                  <p className="text-xl font-bold text-gray-900">
                    $
                    {Number(
                      invoice.total || 0
                    ).toFixed(2)}
                  </p>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium capitalize
                    ${
                      invoice.status ===
                      "paid"
                        ? "bg-green-100 text-green-700"
                        : invoice.status ===
                          "unpaid"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {
                      invoice.status
                    }
                  </span>

                </div>

                {/* DOWNLOAD */}
                {invoice.pdfUrl && (
                  <a
                    href={
                      invoice.pdfUrl
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Download Invoice
                  </a>
                )}

              </div>

            </div>
          ))}

        </div>

        {/* TOTAL */}
        <div className="mt-10 text-right">

          <p className="text-sm text-gray-500">
            Total Spent
          </p>

          <h2 className="text-3xl font-bold text-gray-900">
            $
            {totalSpent.toFixed(
              2
            )}
          </h2>

        </div>

      </Container>

    </section>
  );
}