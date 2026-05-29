import { useState } from "react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";

import logo from "../../assets/WhatsApp Image 2026-05-22 at 10.47.29 PM.jpeg";

export default function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const { cartCount } = useCart();

  const {
    isAuthenticated,
    user,
    userName,
    isAdmin,
    logout,
  } = useAuth();

  const navLinks = [
    { name: "Hosting", path: "/hosting" },
    { name: "Domain", path: "/domain" },
    { name: "Web Dev", path: "/webdev" },
    { name: "Pricing", path: "/pricing" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B1220]/80 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
<Link
  to="/"
  className="flex items-center gap-3 group"
>

  {/* IMAGE */}
  <img
    src={logo}
    alt="Digital Tech Souls"
    className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
  />

  

</Link>

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-8">

            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `
                    relative text-sm font-medium transition-all duration-300
                    ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }
                  `
                }
              >
                {link.name}
              </NavLink>
            ))}

          </nav>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-5">

            {/* CART */}
            <Link
              to="/cart"
              className="relative text-gray-300 hover:text-white transition"
            >
              🛒

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">

                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-white">
                    {userName}
                  </span>

                  <span className="text-xs text-gray-400">
                    {user?.email}
                  </span>
                </div>

                <Link
                  to={
                    isAdmin
                      ? "/admin/dashboard"
                      : "/dashboard"
                  }
                  className="text-sm font-medium text-gray-300 hover:text-white transition"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-xl transition shadow-md"
                >
                  Logout
                </button>

              </div>
            ) : (
              <div className="flex items-center gap-4">

                <Link
                  to="/login"
                  className="text-sm text-gray-300 hover:text-white transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg hover:shadow-cyan-500/20 hover:opacity-95 transition-all duration-300"
                >
                  Get Started
                </Link>

              </div>
            )}

          </div>

          {/* MOBILE BTN */}
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="md:hidden text-2xl text-white"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 py-5 animate-fadeIn">

            <div className="flex flex-col gap-5">

              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className={({ isActive }) =>
                    `
                      text-sm font-medium transition
                      ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      }
                    `
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-4">

                <Link
                  to="/login"
                  className="text-sm text-gray-300 hover:text-white transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-5 py-3 rounded-xl text-sm font-semibold text-center shadow-lg"
                >
                  Get Started
                </Link>

              </div>

            </div>

          </div>
        )}

      </div>

    </header>
  );
}