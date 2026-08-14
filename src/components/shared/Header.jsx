import { NavLink, Link } from "react-router";
import { MdOutlineDarkMode } from "react-icons/md";

function Header() {
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
          </ul>
        </nav>
        <div className="flex gap-2 items-center">
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
        </div>
      </header>
    </>
  );
}

export default Header;
