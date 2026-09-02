import { useSelector } from "react-redux";
import InputField from "../shared/InputField";

function AdminUsers() {
  const { users } = useSelector((state) => state.userState);
  return (
    <>
      <InputField placeholder="Search users..." />
      <div className="pt-4">
        <div className="grid grid-cols-5 border border-[#E4E4E7] rounded-xl pb-4">
          <div className="px-4 pt-3 font-inter font-semibold text-secondary text-xs leading-4">
            USER
          </div>
          <div className="px-4 pt-3 font-inter font-semibold text-secondary text-xs leading-4">
            ROLE
          </div>
          <div className="px-4 pt-3 font-inter font-semibold text-secondary text-xs leading-4">
            STATUS
          </div>
          <div className="px-4 pt-3 font-inter font-semibold text-secondary text-xs leading-4">
            JOINED
          </div>
          <div className="px-4 pt-3"></div>

          {users.map((user) => {
            return (
              <>
                <div className="px-4 pt-3">
                  <p className="font-inter font-medium text-sm text-[#18181B] leading-5">
                    {user.fullName}
                  </p>
                  <p className="font-inter font-normal text-xs text-secondary leading-4">
                    {user.email}
                  </p>
                </div>
                <div className={"px-4 pt-3"}><div className={`rounded-full w-fit flex justify-center items-center px-2 py-0.5 font-inter font-medium text-xs leading-4 ${user.role === 'organizer' ? 'bg-[#FF5F221A] text-primary' : 'bg-[#F4F4F5] text-secondary' }`}>{user.role}</div></div>
                <div className="px-4 pt-3">{user.status || "active"}</div>
                <div className="px-4 pt-3">{user.created_at || "Aug 2026"}</div>
                <div className="px-4 pt-3">...</div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AdminUsers;
