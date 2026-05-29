import {
  useRef,
  useState,
  useCallback,
} from "react";

import {
  searchDomainAPI,
} from "../services/domainService";

export default function useDomain() {

  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [query, setQuery] =
    useState("");

  const [error, setError] =
    useState("");

  const abortRef = useRef(null);

  // ========================================
  // 🔍 SEARCH DOMAIN
  // ========================================
  const search =
    useCallback(
      async (value) => {

        const trimmed =
          value?.trim();

        // ❌ EMPTY
        if (!trimmed) {
          setResults([]);
          setQuery("");
          return;
        }

        setQuery(trimmed);
        setLoading(true);
        setError("");

        // 🧠 CANCEL PREVIOUS REQUEST
        if (abortRef.current) {
          abortRef.current.abort?.();
        }

        const controller =
          new AbortController();

        abortRef.current =
          controller;

        try {

          // 🔥 API CALL
          const res =
            await searchDomainAPI(
              trimmed,
              {
                signal:
                  controller.signal,
              }
            );

          // ✅ SAFE DATA
          setResults(
            res?.data?.domains ||
              []
          );

        } catch (err) {

          // 🚫 IGNORE ABORT
          if (
            err.name !==
            "AbortError"
          ) {

            console.error(
              "Domain search failed:",
              err
            );

            setError(
              err.message ||
                "Failed to search domain"
            );

            setResults([]);
          }

        } finally {

          setLoading(false);
        }
      },
      []
    );

  // ========================================
  // 🧹 CLEAR RESULTS
  // ========================================
  const clearResults =
    useCallback(() => {
      setResults([]);
      setQuery("");
      setError("");
    }, []);

  return {
    results,
    loading,
    query,
    error,

    search,
    clearResults,
  };
}