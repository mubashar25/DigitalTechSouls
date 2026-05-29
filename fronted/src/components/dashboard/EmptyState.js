export default function EmptyState({ title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">

      {/* ICON PLACEHOLDER */}
      <div className="w-16 h-16 rounded-full bg-gray-100 mb-4" />

      <h2 className="text-xl font-semibold text-gray-800">
        {title}
      </h2>

      <p className="text-gray-500 mt-2 max-w-md">
        {subtitle}
      </p>

      {/* OPTIONAL ACTION */}
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}

    </div>
  );
}