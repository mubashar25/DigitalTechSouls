import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore.js";

export default function ProtectedRoute({ adminOnly = false }) {
  const { user } = useAuthStore();

  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}