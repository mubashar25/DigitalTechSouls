import { AuthProvider } from "../store/authStore";

export default function AppAuthProvider({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}