import { useState } from "react";

export default function Search({ onSearch, loading = false }) {
  const [query, setQuery] = useState("");

  const cleanQuery = (value) =>
    value.trim().toLowerCase().replace(/\s+/g, "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = cleanQuery(query);
    if (!cleaned || loading) return;
    onSearch(cleaned);
  };

  const handleSuggestion = (ext) => {
    const base = cleanQuery(query) || "mybrand";
    setQuery(base + ext);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">

      {/* TITLE */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white">
          Search Your Domain
        </h2>
        <p className="text-gray-400 mt-2">
          Find and register your perfect domain instantly
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="relative">

        <div className="flex items-center bg-[#111827] border border-gray-800 rounded-2xl shadow-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 transition">

          <div className="px-4 text-gray-400">🔍</div>

          <input
            type="text"
            placeholder="e.g. mybrand"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-2 py-4 bg-transparent text-white outline-none"
          />

          {query && !loading && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="px-3 text-gray-400 hover:text-white transition"
            >
              ✕
            </button>
          )}

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className={`px-6 py-4 font-medium transition ${
              loading || !query.trim()
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-90 text-white"
            }`}
          >
            {loading ? "Searching..." : "Search"}
          </button>

        </div>
      </form>

      {/* SUGGESTIONS */}
      <div className="flex flex-wrap justify-center gap-2 mt-5">

        {[".com", ".net", ".org"].map((ext) => (
          <button
            key={ext}
            onClick={() => handleSuggestion(ext)}
            className="px-3 py-1 text-sm rounded-full bg-[#111827] border border-gray-700 text-gray-300 hover:border-indigo-500 hover:text-white transition"
          >
            {ext}
          </button>
        ))}

      </div>

    </div>
  );
}