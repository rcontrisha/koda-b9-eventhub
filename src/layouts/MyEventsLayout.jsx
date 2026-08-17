import { NavLink, Outlet } from "react-router";

function MyEventsLayout() {
  return (
    <div className="p-6 pb-0">
      <div className="max-w-7xl lg:px-33.25">
        <div className="">
          <h1 className="font-jakarta font-bold text-2xl">My Events</h1>
          <div className="pt-4">
            <nav className="border-b border-b-[#E4E4E7] flex gap-1">
              <NavLink
                to={"/my-events"}
                end
                className={({ isActive }) =>
                  isActive
                    ? "tab-active"
                    : "font-inter font-medium text-sm py-2.5 px-4 text-secondary"
                }
              >
                Upcoming
              </NavLink>
              <NavLink
                to={"/my-events/past"}
                className={({ isActive }) =>
                  isActive
                    ? "tab-active"
                    : "font-inter font-medium text-sm py-2.5 px-4 text-secondary"
                }
              >
                Past
              </NavLink>
              <NavLink
                to={"/my-events/saved"}
                className={({ isActive }) =>
                  isActive
                    ? "tab-active"
                    : "font-inter font-medium text-sm py-2.5 px-4 text-secondary"
                }
              >
                Saved
              </NavLink>
            </nav>
          </div>
        </div>
        <div className="pt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MyEventsLayout;
