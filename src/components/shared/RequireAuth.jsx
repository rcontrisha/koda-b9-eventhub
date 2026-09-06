import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";

function RequireAuth() {
  const { role } = useAuth();
  return role === 'attendee' ? <Outlet /> : <Navigate to="/" replace />;
}

export default RequireAuth;
