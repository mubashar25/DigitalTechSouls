import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore.js";

// Layouts
import PublicLayout from "./components/layout/PublicLayout.js";
import DashboardLayout from "./components/layout/DashboardLayout.js";
import AdminLayout from "./components/layout/AdminLayout.js";

// Public Pages
import HomePage from "./pages/public/HomePage.js";
import HostingPage from "./pages/public/HostingPage.js";
import DomainPage from "./pages/public/DomainPage.js";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.js";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.js";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage.js";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage.js";

// Dashboard Pages
import DashboardHome from "./pages/dashboard/DashboardHome.js";
import MyOrders from "./pages/dashboard/MyOrders.js";
import MyDomains from "./pages/dashboard/MyDomains.js";
import MyHosting from "./pages/dashboard/MyHosting.jsx";
import ProfilePage from "./pages/dashboard/ProfilePage.js";
import CheckoutPage from "./pages/checkout/CheckoutPage.js";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard.js";
import AdminUsers from "./pages/admin/AdminUsers.js";
import AdminOrders from "./pages/admin/AdminOrders.js";
import AdminHosting from "./pages/admin/AdminHosting.js";
import AdminDomains from "./pages/admin/AdminDomains.js";
import AdminSettings from "./pages/admin/AdminSettings.js";

// Guards
import ProtectedRoute from "./routes/ProtectedRoute.js";

const Spinner = () => (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  const { fetchMe, isInitialized } = useAuthStore();

  useEffect(() => { fetchMe(); }, []);

  if (!isInitialized) return <Spinner />;

  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/hosting" element={<HostingPage />} />
        <Route path="/domains" element={<DomainPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Route>

      {/* AUTH */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* USER DASHBOARD */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/orders" element={<MyOrders />} />
          <Route path="/dashboard/domains" element={<MyDomains />} />
          <Route path="/dashboard/hosting" element={<MyHosting />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>

      {/* ADMIN */}
      <Route element={<ProtectedRoute adminOnly />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/hosting" element={<AdminHosting />} />
          <Route path="/admin/domains" element={<AdminDomains />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
