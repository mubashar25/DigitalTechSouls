import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PublicLayout() {
  const location = useLocation();

  // 🔥 Smooth scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0B1220] text-white overflow-x-hidden">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full">

        {/* Pages render here */}
        <Outlet />

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}