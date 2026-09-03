import { FiCalendar, FiShield } from "react-icons/fi";
import { RxPeople } from "react-icons/rx";
import { Navigate, NavLink, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

function AdminLayout() {
  const { user } = useAuth();

  if (user?.role !== 'admin') return <Navigate to="/" replace />

  return (
    <main>
      <div className="lg:px-13 py-8">
        <div className="flex gap-3 items-center">
          <div className="bg-[#FF5F221A] rounded-xl w-9 h-9 flex items-center justify-center">
            <FiShield className="text-primary" />
          </div>
          <div>
            <h1 className="font-jakarta font-bold text-2xl leading-8 text-black">
              Admin Dashboard
            </h1>
            <p className="font-inter font-normal text-secondary text-xs leading-4">
              Platform Management and Moderation
            </p>
          </div>
        </div>
        <div className="pt-6">
          <nav className="border-b border-b-[#E4E4E7] flex gap-1">
            <NavLink
              to={"/admin"}
              end
              className={({ isActive }) =>
                isActive
                  ? "tab-active flex gap-1.5 items-center justify-center"
                  : "font-inter font-medium text-sm py-2.5 px-4 text-secondary flex gap-1.5 items-center justify-center"
              }
            >
              <FiShield />
              Overview
            </NavLink>
            <NavLink
              to={"users"}
              end
              className={({ isActive }) =>
                isActive
                  ? "tab-active flex gap-1.5 items-center justify-center"
                  : "font-inter font-medium text-sm py-2.5 px-4 text-secondary flex gap-1.5 items-center justify-center"
              }
            >
              <RxPeople />
              Users
            </NavLink>
            <NavLink
              to={"events"}
              end
              className={({ isActive }) =>
                isActive
                  ? "tab-active flex gap-1.5 items-center justify-center"
                  : "font-inter font-medium text-sm py-2.5 px-4 text-secondary flex gap-1.5 items-center justify-center"
              }
            >
              <FiCalendar />
              Events
            </NavLink>
            <NavLink
              to={"communities"}
              end
              className={({ isActive }) =>
                isActive
                  ? "tab-active flex gap-1.5 items-center justify-center"
                  : "font-inter font-medium text-sm py-2.5 px-4 text-secondary flex gap-1.5 items-center justify-center"
              }
            >
              <RxPeople />
              Communities
            </NavLink>
          </nav>
        </div>
        <div className="pt-6">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default AdminLayout;
