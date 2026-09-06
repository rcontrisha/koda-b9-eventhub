import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";

function PasswordModal({ onClose }) {
  const { user, editProfile } = useAuth();
  const { register, handleSubmit } = useForm();
  const { users } = useSelector((state) => state.userState);
  const idx = users.findIndex((u) => u.email === user.email);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center border-b-2 border-b-[#E4E4E7] p-6">
          <h3 className="font-jakarta font-bold text-lg">Edit Profile</h3>
          <RxCross2
            className="w-4.5 h-4.5 text-secondary cursor-pointer"
            onClick={onClose}
          />
        </div>
        <form
          onSubmit={handleSubmit((form) => {
            if (form.old_password === users[idx].password) {
              if (form.new_password === form.confirm_new) {
                editProfile({
                  password: form.new_password,
                });
                toast.success("Success Updating User Info");
                onClose();
                return;
              }
              return toast.error("New Password Confirmation didn't Match");
            }
            return toast.error("Password Incorrect.");
          })}
        >
          <div className="p-6">
            <div>
              <div className="flex flex-col gap-1.5">
                <label className="font-inter font-medium text-sm text-secondary">
                  Old Password
                </label>
                <input
                  type="password"
                  placeholder="Your old password here"
                  defaultValue=""
                  className="border border-[#E4E4E7] px-3 py-2.5 rounded-lg focus:outline-gray-400"
                  {...register("old_password")}
                />
              </div>
              <div className="pt-4 flex flex-col gap-1.5">
                <label className="font-inter font-medium text-sm text-secondary">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Type your new password"
                  defaultValue=""
                  className="border border-[#E4E4E7] px-3 py-2.5 rounded-lg focus:outline-gray-400"
                  {...register("new_password")}
                />
              </div>
              <div className="pt-4 flex flex-col gap-1.5">
                <label className="font-inter font-medium text-sm text-secondary">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="Type again your new password"
                  defaultValue=""
                  className="border border-[#E4E4E7] px-3 py-2.5 rounded-lg focus:outline-gray-400"
                  {...register("confirm_new")}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 p-6 pt-0 justify-end">
            <button
              onClick={onClose}
              className="w-fit py-2 px-4 border border-[#E4E4E7] text-secondary rounded-lg font-inter text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              // onClick={onClose}
              className="w-fit text-center bg-primary text-white py-2 px-4 rounded-lg font-inter text-sm cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordModal;
