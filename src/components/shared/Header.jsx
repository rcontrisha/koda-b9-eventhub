import { useState } from "react";
import { NavLink, Link } from "react-router";
import { MdOutlineDarkMode, MdOutlineNotificationsNone } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";

function Header() {
  const { user, isGuest, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <header className="hidden px-6 py-3 border-b border-b-[#E4E4E7] md:flex items-center justify-between">
        <div className="flex items-center space-x-2 pr-6">
          <span className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-bold font-jakarta text-white">
            E
          </span>
          <span className="font-bold text-lg font-jakarta">EventHub</span>
        </div>
        <nav className="mr-auto">
          <ul className="flex gap-4 items-center">
            <li className="font-inter font-medium text-secondary text-sm ">
              <NavLink
                to={"/explore"}
                className={({ isActive }) => isActive ? "active" : "font-inter font-medium text-sm py-1.5 px-3"}
              >
                Explore
              </NavLink>
            </li>
            <li className="font-inter font-medium text-secondary text-sm">
              <NavLink
                to={"/events"}
                className={({ isActive }) => isActive ? "active" : "font-inter font-medium text-sm py-1.5 px-3"}
              >
                Events
              </NavLink>
            </li>
            <li className="font-inter font-medium text-secondary text-sm">
              <NavLink
                to={"/communities"}
                className={({ isActive }) => isActive ? "active" : "font-inter font-medium text-sm py-1.5 px-3"}
              >
                Communities
              </NavLink>
            </li>
            {!isGuest && (
              <li className="font-inter font-medium text-secondary text-sm">
                <NavLink
                  to="/my-events"
                  className={({ isActive }) => isActive ? "active" : "font-inter font-medium text-sm py-1.5 px-3"}
                >
                  My Events
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className="flex gap-2 items-center">
          {isGuest ? (
            <>
              <p className="text-[#9F9FA9] text-xs font-normal font-inter">
                Browsing as guest
              </p>
              <div className="p-2">
                <MdOutlineDarkMode color="#52525C" className="w-full h-full" />
              </div>
              <Link
                to={"/login"}
                className="bg-primary text-white font-inter font-semibold text-sm px-4 py-1.5 rounded-lg"
              >
                Sign In
              </Link>
            </>
          ) : (
            <>
              <div className="p-2 cursor-pointer">
                <MdOutlineNotificationsNone color="#52525C" className="w-full h-full" />
              </div>
              <div className="p-2">
                <MdOutlineDarkMode color="#52525C" className="w-full h-full" />
              </div>
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm"
                >
                  {user.fullName[0]}
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E4E4E7] rounded-lg shadow-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#E4E4E7]">
                      <p className="font-inter font-semibold text-sm">{user.fullName}</p>
                      <p className="font-inter text-xs text-secondary">{user.email}</p>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2.5 font-inter text-sm text-secondary hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
