import { useMemo } from "react";
import Container from "../../common/Container";

export default function DomainSuggestions({ query, onSelect }) {

  const cleanQuery = query?.trim().toLowerCase().replace(/\s+/g, "");

  const suggestions = useMemo(() => {
    if (!cleanQuery) return [];
    return [
      `${cleanQuery}.com`,
      `${cleanQuery}.net`,
      `${cleanQuery}.org`,
      `${cleanQuery}.store`,
      `${cleanQuery}.online`,
    ];
  }, [cleanQuery]);

  if (!cleanQuery) return null;

  return (
    <div className="mt-8">

      <Container>

        <p className="text-sm text-gray-400 mb-3">
          Suggested domains:
        </p>

        <div className="flex flex-wrap gap-2">

          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() => onSelect(item)}
              className="px-3 py-1 text-sm rounded-full bg-[#111827] border border-gray-800 text-gray-300 hover:border-indigo-500 hover:text-white transition"
            >
              {item}
            </button>
          ))}

        </div>

      </Container>

    </div>
  );
}