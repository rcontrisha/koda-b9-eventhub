import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";

function RequireAuth() {
  const { isAttendee } = useAuth();
  return isAttendee ? <Outlet /> : <Navigate to="/" replace />;
}

export default RequireAuth;
