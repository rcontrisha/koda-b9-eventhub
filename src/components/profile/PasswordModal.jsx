import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { useAuth } from "../../hooks/useAuth";

function PasswordModal({ onClose }) {
  const { user, editProfile } = useAuth();
  const { register, handleSubmit } = useForm();
  const { users } = useSelector((state) => state.userState);
  const idx = users.findIndex((u) => u.email === user.email);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 transition-all"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-neutral-900 border border-[#E4E4E7] dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-[#E4E4E7] dark:border-neutral-800 p-6">
          <h3 className="font-jakarta font-bold text-lg text-neutral-900 dark:text-neutral-100">
            Change Password
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-secondary dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <RxCross2 className="w-5 h-5 cursor-pointer" />
          </button>
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
          <div className="p-6 space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-inter font-medium text-xs sm:text-sm text-secondary dark:text-neutral-400">
                Old Password
              </label>
              <input
                type="password"
                placeholder="Your old password here"
                defaultValue=""
                className="bg-white dark:bg-neutral-800/70 border border-[#E4E4E7] dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-primary dark:focus:border-primary transition-colors"
                {...register("old_password")}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-inter font-medium text-xs sm:text-sm text-secondary dark:text-neutral-400">
                New Password
              </label>
              <input
                type="password"
                placeholder="Type your new password"
                defaultValue=""
                className="bg-white dark:bg-neutral-800/70 border border-[#E4E4E7] dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-primary dark:focus:border-primary transition-colors"
                {...register("new_password")}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-inter font-medium text-xs sm:text-sm text-secondary dark:text-neutral-400">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Type again your new password"
                defaultValue=""
                className="bg-white dark:bg-neutral-800/70 border border-[#E4E4E7] dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-primary dark:focus:border-primary transition-colors"
                {...register("confirm_new")}
              />
            </div>
          </div>

          <div className="flex gap-3 p-6 pt-2 border-t border-[#E4E4E7] dark:border-neutral-800 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 border border-[#E4E4E7] dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-secondary dark:text-neutral-300 rounded-lg font-inter text-sm cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary hover:bg-orange-600 text-white py-2 px-5 rounded-lg font-inter text-sm font-medium cursor-pointer transition-colors"
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