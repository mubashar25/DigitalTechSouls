import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { FiGrid, FiUsers, FiShoppingBag, FiServer, FiGlobe, FiSettings, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import useAuthStore from "../../store/authStore.js";

const adminLinks = [
  { to: "/admin", icon: FiGrid, label: "Dashboard" },
  { to: "/admin/users", icon: FiUsers, label: "Users" },
  { to: "/admin/orders", icon: FiShoppingBag, label: "Orders" },
  { to: "/admin/hosting", icon: FiServer, label: "Hosting" },
  { to: "/admin/domains", icon: FiGlobe, label: "Domains" },
  { to: "/admin/settings", icon: FiSettings, label: "Settings" },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => { await logout(); navigate("/login"); };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-yellow-900/30 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-gray-900 font-bold text-xs">A</span>
              </div>
              <span className="font-bold text-white text-sm">Admin Panel</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400"><FiX size={18} /></button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            {adminLinks.map(({ to, icon: Icon, label }) => {
              const isActive = location.pathname === to;
              return (
                <Link key={to} to={to} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}>
                  <Icon size={18} />{label}
                </Link>
              );
            })}
          </nav>

          <div className="px-3 pb-4 border-t border-gray-800 pt-4 space-y-2">
            <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-all">
              ← User Dashboard
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-gray-800 w-full transition-all">
              <FiLogOut size={16} />Logout
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white"><FiMenu size={22} /></button>
          <div className="flex items-center gap-2">
            <span className="badge-yellow text-xs">Admin</span>
            <span className="text-sm text-gray-400 hidden sm:block">{user?.fullName}</span>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto"><Outlet /></main>
      </div>
    </div>
  );
}