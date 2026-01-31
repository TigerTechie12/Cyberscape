import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function ProtectedRoute({ adminOnly = false, userOnly = false }: { adminOnly?: boolean, userOnly?: boolean }) {
  const { isLoggedIn, isAdmin } = useAuth()
  if (!isLoggedIn) return <Navigate to="/login" replace />
  if (adminOnly && !isAdmin) return <Navigate to="/dashboard" replace />
  if (userOnly && isAdmin) return <Navigate to="/admin" replace />
  return <Outlet />
}
