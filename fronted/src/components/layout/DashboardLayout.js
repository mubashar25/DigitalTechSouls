import { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useUI from "../../hooks/useUI";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user, logout } = useAuth();
  const { showToast } = useUI();

  // ⚡ MEMOIZED MENU (performance fix)
  const menu = useMemo(
    () => [
      { name: "Dashboard", path: "/dashboard" },
      { name: "My Services", path: "/dashboard/services" },
      { name: "Domains", path: "/dashboard/domains" },
      { name: "Billing", path: "/dashboard/billing" },
      { name: "Settings", path: "/dashboard/settings" },
    ],
    []
  );

  const handleLogout = () => {
    logout();
    showToast("Logged out successfully", "success");
  };

  // ESC close + scroll lock (PRO UX)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };

    window.addEventListener("keydown", handleKey);

    // 🔥 lock body scroll when sidebar open
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-50 w-64 h-full bg-white border-r flex flex-col
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >

        {/* BRAND */}
        <div className="p-5 border-b">
          <h1 className="text-lg font-bold text-blue-600">
            HostPro Dashboard
          </h1>
        </div>

        {/* MENU */}
        <nav className="p-4 space-y-2 flex-1">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `
                  block px-3 py-2 rounded-lg text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow"
                      : "text-gray-600 hover:bg-gray-100"
                  }
                `
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* USER */}
        <div className="p-4 border-t bg-gray-50">

          <p className="text-sm font-semibold text-gray-800">
            {user?.name || "User"}
          </p>

          <p className="text-xs text-gray-500 mb-3">
            {user?.email || "user@example.com"}
          </p>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-lg transition"
          >
            Logout
          </button>

        </div>

      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col md:ml-64">

        {/* TOPBAR */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4">

          <button
            className="md:hidden text-2xl"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <h2 className="font-semibold text-gray-800">
            Dashboard
          </h2>

          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>

        </header>

        {/* CONTENT */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}