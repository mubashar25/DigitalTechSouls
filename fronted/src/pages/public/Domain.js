import { useState } from "react";

import Search from "../../components/sections/domain/Search";
import Results from "../../components/sections/domain/Results";

import Container from "../../components/common/Container";
import Loader from "../../components/ui/Loader";

import useDomain from "../../hooks/useDomain";

export default function Domain() {

  const {
    results,
    loading,
    error,
    search,
  } = useDomain();

  const [searched, setSearched] =
    useState(false);

  // ========================================
  // 🔍 HANDLE SEARCH
  // ========================================
  const handleSearch =
    async (query) => {

      if (!query?.trim()) {
        return;
      }

      setSearched(true);

      await search(query);
    };

  return (
    <section className="py-20 bg-gray-50 min-h-screen">

      <Container>

        {/* HEADER */}
        <div className="text-center mb-10">

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Find Your Perfect Domain
          </h1>

          <p className="text-gray-500 mt-3 text-sm md:text-base">
            Search and register domains instantly with fast availability checking
          </p>

        </div>

        {/* SEARCH */}
        <Search
          onSearch={handleSearch}
        />

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center mt-14">
            <Loader />
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="mt-10 bg-red-100 border border-red-300 text-red-700 px-5 py-4 rounded-xl">

            <p className="font-medium">
              {error}
            </p>

          </div>
        )}

        {/* RESULTS */}
        {!loading &&
          results.length > 0 && (
            <div className="mt-12">
              <Results
                results={results}
              />
            </div>
          )}

        {/* EMPTY */}
        {!loading &&
          searched &&
          results.length === 0 &&
          !error && (
            <div className="text-center mt-12 bg-white p-10 rounded-2xl border border-gray-200 shadow-sm">

              <h3 className="text-xl font-semibold text-gray-900">
                No Domains Found
              </h3>

              <p className="text-gray-500 mt-2">
                Try another keyword or extension
              </p>

            </div>
          )}

        {/* DEFAULT STATE */}
        {!loading &&
          !searched && (
            <div className="text-center mt-14 bg-white p-10 rounded-2xl border border-gray-200 shadow-sm">

              <h3 className="text-xl font-semibold text-gray-900">
                Search Your Dream Domain
              </h3>

              <p className="text-gray-500 mt-2">
                Example:
                {" "}
                <span className="font-medium text-black">
                  mybusiness
                </span>
              </p>

              <p className="text-sm text-gray-400 mt-3">
                We support .com, .net, .org, .store and more
              </p>

            </div>
          )}

      </Container>

    </section>
  );
}