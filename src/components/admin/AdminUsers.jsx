import React from "react";
import { useSelector } from "react-redux";
import InputField from "../shared/InputField";

function AdminUsers() {
  const { users } = useSelector((state) => state.userState);

  return (
    <>
      <InputField placeholder="Search users..." />
      <div className="pt-4">
        <div className="grid grid-cols-5 border border-[#E4E4E7] dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl overflow-hidden pb-4">
          <div className="px-4 py-3 font-inter font-semibold text-secondary dark:text-neutral-400 text-xs leading-4">
            USER
          </div>
          <div className="px-4 py-3 font-inter font-semibold text-secondary dark:text-neutral-400 text-xs leading-4">
            ROLE
          </div>
          <div className="px-4 py-3 font-inter font-semibold text-secondary dark:text-neutral-400 text-xs leading-4">
            STATUS
          </div>
          <div className="px-4 py-3 font-inter font-semibold text-secondary dark:text-neutral-400 text-xs leading-4">
            JOINED
          </div>
          <div className="px-4 py-3"></div>

          {users.map((user) => {
            return (
              <React.Fragment key={user.id || user.email}>
                <div className="px-4 py-3 border-t border-[#E4E4E7] dark:border-neutral-800 flex flex-col justify-center">
                  <p className="font-inter font-medium text-sm text-[#18181B] dark:text-neutral-100 leading-5">
                    {user.fullName}
                  </p>
                  <p className="font-inter font-normal text-xs text-secondary dark:text-neutral-400 leading-4">
                    {user.email}
                  </p>
                </div>

                <div className="px-4 py-3 border-t border-[#E4E4E7] dark:border-neutral-800 flex items-center">
                  <div
                    className={`rounded-full w-fit flex justify-center items-center px-2 py-0.5 font-inter font-medium text-xs leading-4 capitalize ${
                      user.role === "organizer"
                        ? "bg-[#FF5F221A] text-primary"
                        : "bg-[#F4F4F5] dark:bg-neutral-800 text-secondary dark:text-neutral-300"
                    }`}
                  >
                    {user.role}
                  </div>
                </div>

                <div className="px-4 py-3 border-t border-[#E4E4E7] dark:border-neutral-800 flex items-center">
                  <div
                    className={`rounded-full w-fit flex justify-center items-center px-2 py-0.5 font-inter font-medium text-xs leading-4 capitalize ${
                      user.status === "suspended"
                        ? "bg-[#FFE2E2] dark:bg-red-950/40 text-[#E7000B] dark:text-red-400"
                        : "bg-[#33B5701A] text-[#33B570]"
                    }`}
                  >
                    {user.status || "active"}
                  </div>
                </div>

                <div className="px-4 py-3 border-t border-[#E4E4E7] dark:border-neutral-800 font-inter font-normal text-xs text-secondary dark:text-neutral-400 leading-4 flex items-center">
                  {user.created_at || "Aug 2026"}
                </div>

                <div className="px-4 py-3 border-t border-[#E4E4E7] dark:border-neutral-800 text-secondary dark:text-neutral-400 flex items-center">
                  ...
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AdminUsers;