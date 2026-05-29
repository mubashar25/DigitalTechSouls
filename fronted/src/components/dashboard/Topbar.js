import useAuth from "../../hooks/useAuth";

export default function Topbar({ setIsOpen }) {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between bg-white border-b px-4 py-3 shadow-sm">

      {/* ☰ MOBILE MENU */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-gray-700 text-xl"
      >
        ☰
      </button>

      {/* TITLE */}
      <h1 className="font-semibold text-gray-800">
        Dashboard
      </h1>

      {/* 👤 USER INFO */}
      <div className="text-right hidden sm:block">
        <p className="text-sm font-medium">
          {user?.name || "User"}
        </p>
        <p className="text-xs text-gray-500">
          {user?.email || "user@example.com"}
        </p>
      </div>

    </header>
  );
}