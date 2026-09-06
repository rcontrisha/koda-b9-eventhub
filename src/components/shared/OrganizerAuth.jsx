import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";

function OrganizerAuth() {
  const { role } = useAuth();
  return role === 'organizer' ? <Outlet /> : <Navigate to="/" replace />;
}
  
export default OrganizerAuth;
