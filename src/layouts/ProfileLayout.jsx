import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import {
  MdOutlineEvent,
  MdOutlinePinDrop,
  MdOutlineEdit,
} from "react-icons/md";

import { useAuth } from "../hooks/useAuth";
import EditModal from "../components/profile/EditModal";

function ProfileLayout() {
  const { user, role } = useAuth();
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <main>
      <div className="px-4 py-8">
        <div className="flex gap-5 lg:px-61.25">
          <div className="relative w-20 h-20 bg-secondary text-white rounded-2xl flex items-center justify-center font-semibold text-lg shrink-0">
            {user.photo ? (
              <img src={user.photo} className="w-full h-full rounded-2xl" />
            ) : (
              user.fullName[0]
            )}
            <div className="bg-[#33B570] w-5 h-5 absolute -bottom-1 -right-1 rounded-full"></div>
          </div>
          <div className="w-full">
            <div className="lg:flex lg:justify-between">
              <div>
                <p className="font-jakarta font-bold text-xl">
                  {user.fullName}
                </p>
                <p className="font-inter font-normal text-secondary text-sm">
                  {user.email}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowPrompt(true);
                }}
                className="flex gap-2 mt-2 lg:mt-0 h-fit items-center px-3 py-1.5 border border-[#E4E4E7] rounded-lg font-inter font-medium text-sm text-secondary cursor-pointer"
              >
                <MdOutlineEdit />
                Edit Profile
              </button>
            </div>
            <div className="flex justify-between lg:justify-start flex-wrap gap-3 pt-2">
              <div className="flex gap-1 items-center font-inter font-normal text-xs text-secondary">
                <MdOutlinePinDrop height={11} width={11} />
                {user.location || 'Bandung, Indonesia'}
              </div>
              <div className="flex gap-1 items-center font-inter font-normal text-xs text-secondary">
                <MdOutlineEvent height={11} width={11} />
                Joined March 2025
              </div>
              <div className="basis-full lg:basis-0">
                <div className="first-letter:uppercase active rounded-full px-2 py-0.5 w-fit">
                  {role}
                </div>
              </div>
            </div>
            <div className="pt-2">
              <p className="font-inter font-normal text-sm text-secondary">
                {user.bio || `Backend engineer & community builder. Passionate about Go, distributed systems, and connecting people through events.`}
              </p>
            </div>
          </div>
        </div>
        <div className="pt-6 pb-2 lg:px-61.25">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="font-jakarta font-bold text-2xl">
                {user.joined_events ? user.joined_events.length : 0}
              </p>
              <p className="font-inter font-normal text-secondary text-xs">
                Events
              </p>
            </div>
            <div className="text-center border-x-2 border-x-[#E4E4E7]">
              <p className="font-jakarta font-bold text-2xl">
                {user.joined_communities ? user.joined_communities.length : 0}
              </p>
              <p className="font-inter font-normal text-secondary text-xs">
                Communities
              </p>
            </div>
            <div className="text-center">
              <p className="font-jakarta font-bold text-2xl">
                {user.saved_events ? user.saved_events.length : 0}
              </p>
              <p className="font-inter font-normal text-secondary text-xs">
                Saved
              </p>
            </div>
          </div>
        </div>
        <div className="pt-6 lg:px-61.25">
          <nav className="border-b border-b-[#E4E4E7] flex gap-1">
            <NavLink
              to={"/profile"}
              end
              className={({ isActive }) =>
                isActive
                  ? "tab-active"
                  : "font-inter font-medium text-sm py-2.5 px-4 text-secondary"
              }
            >
              Events
            </NavLink>
            <NavLink
              to={"/profile/communities"}
              end
              className={({ isActive }) =>
                isActive
                  ? "tab-active"
                  : "font-inter font-medium text-sm py-2.5 px-4 text-secondary"
              }
            >
              Communities
            </NavLink>
            <NavLink
              to={"/profile/saved"}
              end
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
        <div className="pt-6 lg:px-61.25">
          <Outlet />
        </div>
      </div>
      {showPrompt && <EditModal onClose={() => setShowPrompt(false)} />}
    </main>
  );
}

export default ProfileLayout;
