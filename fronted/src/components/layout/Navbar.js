import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut, FiGrid } from "react-icons/fi";
import useAuthStore from "../../store/authStore.js";
import useCartStore from "../../store/cartStore.js";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { items } = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { to: "/hosting", label: "Hosting" },
    { to: "/domains", label: "Domains" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DT</span>
            </div>
            <span className="font-bold text-white text-lg">DigitalTechSouls</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.to ? "text-blue-400" : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {/* Cart */}
                <Link to="/checkout" className="relative p-2 text-gray-400 hover:text-white transition-colors">
                  <FiShoppingCart size={20} />
                  {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </Link>

                {/* Dashboard */}
                <Link to="/dashboard" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                  <FiGrid size={16} />
                  Dashboard
                </Link>

                {/* Admin */}
                {user.role === "admin" && (
                  <Link to="/admin" className="text-sm text-yellow-400 hover:text-yellow-300 font-medium transition-colors">
                    Admin
                  </Link>
                )}

                {/* Logout */}
                <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors">
                  <FiLogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-gray-300 hover:text-white transition-colors font-medium">Login</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-400 hover:text-white p-2">
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-800 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setIsOpen(false)} className="block py-2 text-gray-300 hover:text-white text-sm font-medium">
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300 hover:text-white text-sm">Dashboard</Link>
                <button onClick={handleLogout} className="block py-2 text-red-400 text-sm text-left w-full">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300 text-sm">Login</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="block py-2 text-blue-400 text-sm font-semibold">Get Started</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}