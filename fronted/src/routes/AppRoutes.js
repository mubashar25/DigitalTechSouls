import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// 🧩 LAYOUTS
import PublicLayout from "../components/layout/PublicLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

// 🔒 ROUTE SECURITY
import ProtectedRoute from "./ProtectedRoute";

// ⏳ GLOBAL LOADER
import Loader from "../components/common/Loader";

// =====================================================
// 🌐 PUBLIC PAGES
// =====================================================

const Home = lazy(() => import("../pages/public/Home"));
const Hosting = lazy(() => import("../pages/public/Hosting"));
const Domain = lazy(() => import("../pages/public/Domain"));
const WebDev = lazy(() => import("../pages/public/WebDev"));

// ✅ FIXED: only ONE import (no duplicate)
const BrandSocialServices = lazy(() =>
  import("../pages/public/BrandSocialServices")
);

const Contact = lazy(() => import("../pages/Contact"));

// =====================================================
// 🔐 AUTH PAGES
// =====================================================

const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));

// =====================================================
// 🛒 CHECKOUT FLOW
// =====================================================

const Cart = lazy(() => import("../pages/checkout/Cart"));
const DomainSelection = lazy(() => import("../pages/checkout/DomainSelection"));
const Checkout = lazy(() => import("../pages/checkout/Checkout"));
const Success = lazy(() => import("../pages/checkout/Success"));

// =====================================================
// 📊 DASHBOARD PAGES
// =====================================================

const DashboardHome = lazy(() => import("../pages/dashboard/DashboardHome"));
const MyServices = lazy(() => import("../pages/dashboard/MyServices"));
const Domains = lazy(() => import("../pages/dashboard/Domains"));
const Billing = lazy(() => import("../pages/dashboard/Billing"));
const Settings = lazy(() => import("../pages/dashboard/Settings"));

// =====================================================
// 🚫 NOT FOUND PAGE
// =====================================================

const NotFound = () => (
  <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="text-center max-w-lg">
      <h1 className="text-7xl font-extrabold text-gray-900">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mt-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 mt-4">
        The page you are looking for does not exist.
      </p>

      <button
        onClick={() => (window.location.href = "/")}
        className="mt-8 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800"
      >
        Back To Homepage
      </button>
    </div>
  </section>
);

// =====================================================
// 🚀 ROUTES
// =====================================================

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>

        {/* 🌐 PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/hosting" element={<Hosting />} />
          <Route path="/domain" element={<Domain />} />
          <Route path="/webdev" element={<WebDev />} />

          {/* ✅ SERVICES PAGE ADDED HERE */}
          <Route path="/services" element={<BrandSocialServices />} />

          <Route path="/contact" element={<Contact />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* CHECKOUT */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/domain-selection" element={<DomainSelection />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
        </Route>

        {/* 🔒 DASHBOARD */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="services" element={<MyServices />} />
            <Route path="domains" element={<Domains />} />
            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* 🚫 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  );
}