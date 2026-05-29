import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useUI from "../../hooks/useUI";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { logout } = useAuth();
  const { showToast } = useUI();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Services", path: "/dashboard/services" },
    { name: "Domains", path: "/dashboard/domains" },
    { name: "Billing", path: "/dashboard/billing" },
    { name: "Settings", path: "/dashboard/settings" },
  ];

  const handleLogout = () => {
    logout();
    showToast("success", "Logged out successfully");
  };

  return (
    <>
      {/* 🔥 MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 🟣 SIDEBAR */}
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-white border-r p-5
        transform transition-transform duration-300 flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* LOGO */}
        <h2 className="text-xl font-bold mb-6">
          SaaS Dashboard
        </h2>

        {/* MENU */}
        <nav className="space-y-2 flex-1">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md text-sm transition ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* 🔴 LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded transition"
        >
          Logout
        </button>
      </aside>
    </>
  );
}