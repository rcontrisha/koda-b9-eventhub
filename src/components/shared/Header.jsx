import { useState } from "react";
import { NavLink, Link } from "react-router";
import {
  MdOutlineDarkMode,
  MdOutlineNotificationsNone,
  MdMenu,
  MdClose,
  MdOutlineExplore,
  MdOutlineHome,
  MdOutlinePeople,
  MdOutlineEvent,
  MdOutlinePerson,
  MdOutlineLogin,
  MdOutlineLogout,
} from "react-icons/md";
import { useDispatch } from "react-redux";

import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../redux/slices/LoginSlice";

function Header() {
  const dispatch = useDispatch();
  const { user, isGuest } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="px-6 py-3 border-b border-b-[#E4E4E7] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-bold font-jakarta text-white">
            E
          </span>
          <span className="font-bold text-lg font-jakarta">EventHub</span>
        </div>

        <nav className="mr-auto hidden md:block ml-4">
          <ul className="flex gap-4 items-center">
            <li className="font-inter font-medium text-secondary text-sm ">
              <NavLink
                to={"/explore"}
                className={({ isActive }) =>
                  isActive
                    ? "active"
                    : "font-inter font-medium text-sm py-1.5 px-3"
                }
              >
                Explore
              </NavLink>
            </li>
            <li className="font-inter font-medium text-secondary text-sm">
              <NavLink
                to={"/events"}
                className={({ isActive }) =>
                  isActive
                    ? "active"
                    : "font-inter font-medium text-sm py-1.5 px-3"
                }
              >
                Events
              </NavLink>
            </li>
            <li className="font-inter font-medium text-secondary text-sm">
              <NavLink
                to={"/communities"}
                className={({ isActive }) =>
                  isActive
                    ? "active"
                    : "font-inter font-medium text-sm py-1.5 px-3"
                }
              >
                Communities
              </NavLink>
            </li>
            {!isGuest && (
              <li className="font-inter font-medium text-secondary text-sm">
                <NavLink
                  to="/my-events"
                  className={({ isActive }) =>
                    isActive
                      ? "active"
                      : "font-inter font-medium text-sm py-1.5 px-3"
                  }
                >
                  My Events
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="hidden md:flex gap-2 items-center">
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
                className="flex items-center gap-1.5 bg-primary text-white font-inter font-semibold text-sm px-4 py-1.5 rounded-lg"
              >
                <MdOutlineLogin className="w-4 h-4" />
                Sign In
              </Link>
            </>
          ) : (
            <>
              <div className="p-2 cursor-pointer">
                <MdOutlineNotificationsNone
                  color="#52525C"
                  className="w-full h-full"
                />
              </div>
              <div className="p-2">
                <MdOutlineDarkMode color="#52525C" className="w-full h-full" />
              </div>
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm"
                >
                  {user?.fullName[0]}
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E4E4E7] rounded-lg shadow-lg overflow-hidden">
                    <div className="flex items-center gap-3 px-2 py-3 border-b border-[#E4E4E7]">
                      <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm shrink-0">
                        {user?.fullName[0]}
                      </div>
                      <div>
                        <p className="font-inter font-semibold text-sm">
                          {user?.fullName}
                        </p>
                        <p className="font-inter text-xs text-secondary">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 w-full text-left px-4 py-2.5 font-inter text-sm text-secondary hover:bg-gray-50"
                    >
                      <MdOutlinePerson className="w-5 h-5" />
                      My Profile
                    </Link>
                    <button
                      onClick={() => dispatch(logout())}
                      className="w-full flex items-center gap-2 text-left px-4 py-2.5 font-inter text-sm text-red-500 font-medium hover:bg-gray-50"
                    >
                      <MdOutlineLogout className="w-5 h-5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center gap-2">
          {!isGuest && (
            <div className="p-2 cursor-pointer">
              <MdOutlineNotificationsNone
                color="#52525C"
                className="w-full h-full"
              />
            </div>
          )}
          <div className="p-2">
            <MdOutlineDarkMode color="#52525C" className="w-full h-full" />
          </div>
          <div className="relative">
            <button className="p-2" onClick={() => setMenuOpen((v) => !v)}>
              {menuOpen ? (
                <MdClose className="w-6 h-6 text-secondary" />
              ) : (
                <MdMenu className="w-6 h-6 text-secondary" />
              )}
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E4E4E7] rounded-2xl shadow-lg overflow-hidden">
                {!isGuest && (
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E4E4E7]">
                    <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm shrink-0">
                      {user?.fullName[0]}
                    </div>
                    <div>
                      <p className="font-inter font-semibold text-sm">
                        {user?.fullName}
                      </p>
                      <p className="font-inter text-xs text-secondary">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                )}
                <nav className="py-2">
                  <ul className="flex flex-col">
                    <li>
                      <NavLink
                        to="/explore"
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-4 py-2 font-inter text-sm ${isActive ? "text-primary font-medium" : "text-secondary"}`
                        }
                      >
                        <MdOutlineHome className="w-5 h-5" />
                        Explore
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/events"
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-4 py-2 font-inter text-sm ${isActive ? "text-primary font-medium" : "text-secondary"}`
                        }
                      >
                        <MdOutlineExplore className="w-5 h-5" />
                        Events
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/communities"
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-4 py-2 font-inter text-sm ${isActive ? "text-primary font-medium" : "text-secondary"}`
                        }
                      >
                        <MdOutlinePeople className="w-5 h-5" />
                        Communities
                      </NavLink>
                    </li>
                    {!isGuest && (
                      <>
                        <li>
                          <NavLink
                            to="/my-events"
                            className={({ isActive }) =>
                              `flex items-center gap-2 px-4 py-2 font-inter text-sm ${isActive ? "text-primary font-medium" : "text-secondary"}`
                            }
                          >
                            <MdOutlineEvent className="w-5 h-5" />
                            My Events
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                              `flex items-center gap-2 px-4 py-2 font-inter text-sm ${isActive ? "text-primary font-medium" : "text-secondary"}`
                            }
                          >
                            <MdOutlinePerson className="w-5 h-5" />
                            My Profile
                          </NavLink>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
                <div className="border-t border-[#E4E4E7] py-2 px-2">
                  {isGuest ? (
                    <Link
                      to="/login"
                      className="flex items-center gap-2 px-4 py-2 font-inter text-sm text-primary font-semibold"
                    >
                      <MdOutlineLogin className="w-5 h-5" />
                      Sign In
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        console.log('bujang')
                        dispatch(logout());
                      }}
                      className="w-full flex items-center gap-2 text-left px-4 py-2 font-inter text-sm text-red-500 font-medium hover:bg-gray-50"
                    >
                      <MdOutlineLogout className="w-5 h-5" />
                      Sign Out
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
