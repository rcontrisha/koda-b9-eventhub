import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";

function OrganizerAuth() {
  const { isOrganizer } = useAuth();
  return isOrganizer ? <Outlet /> : <Navigate to="/" replace />;
}

export default OrganizerAuth;
