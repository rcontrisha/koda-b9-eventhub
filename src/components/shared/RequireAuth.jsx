import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";

function RequireAuth() {
  const { isAttendee } = useAuth();
  return isAttendee ? <Outlet /> : <Navigate to="/explore" replace />;
}

export default RequireAuth;
