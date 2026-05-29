export default function PageWrapper({ children }) {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}