export default function StatCard({ title, value, change }) {
  return (
    <div className="p-5 bg-white rounded-xl border shadow-sm hover:shadow-md transition">

      {/* TITLE */}
      <p className="text-sm text-gray-500">
        {title}
      </p>

      {/* VALUE */}
      <h2 className="text-3xl font-bold mt-2 text-gray-800">
        {value}
      </h2>

      {/* CHANGE */}
      {change && (
        <p className="text-xs text-green-600 mt-2">
          {change}
        </p>
      )}

    </div>
  );
}