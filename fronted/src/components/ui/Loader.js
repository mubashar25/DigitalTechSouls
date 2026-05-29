export default function Loader() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-10 h-10 rounded-full border-4 border-indigo-500/20"></div>

        <div className="absolute inset-0 w-10 h-10 rounded-full border-4 border-transparent border-t-indigo-600 animate-spin"></div>
      </div>
    </div>
  );
}