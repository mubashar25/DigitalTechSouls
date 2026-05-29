import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import useAuth from "../hooks/useAuth";

import Loader from "../components/common/Loader";

export default function ProtectedRoute({
  adminOnly = false,
}) {
  const {
    isAuthenticated,
    loading,
    isAdmin,
  } = useAuth();

  const location = useLocation();

  // 🔄 SESSION LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  // 🔒 USER NOT LOGGED IN
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
          message:
            "Please login to continue",
        }}
      />
    );
  }

  // 🛡 ADMIN ROUTE PROTECTION
  if (adminOnly && !isAdmin) {
    return (
      <Navigate
        to="/dashboard"
        replace
        state={{
          message:
            "Access denied",
        }}
      />
    );
  }

  // ✅ ACCESS GRANTED
  return <Outlet />;
}