import { useForm } from "react-hook-form";
import { RxCross2, RxUpload, RxTrash } from "react-icons/rx";
import { GrPowerCycle } from "react-icons/gr";
import { useState } from "react";
import { toast } from "sonner";

import { useAuth } from "../../hooks/useAuth";

function EditModal({ onClose }) {
  const { user, editProfile } = useAuth();
  const { register, handleSubmit } = useForm();
  const [photo, setPhoto] = useState(user.photo || null);

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
            Edit Profile
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
            editProfile({
              fullName: form.fullName,
              location: form.location,
              bio: form.bio,
              photo: photo,
            });
            toast.success("Success Updating User Info");
            onClose();
          })}
        >
          <div className="p-6 space-y-4">
            {/* Photo Section */}
            <div className="flex gap-4 items-center justify-start w-full">
              <div className="w-20 h-20 bg-secondary dark:bg-neutral-800 text-white rounded-2xl flex items-center justify-center font-semibold text-lg shrink-0 overflow-hidden border border-neutral-200 dark:border-neutral-700">
                {photo ? (
                  <img
                    src={photo}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user.fullName?.[0]
                )}
              </div>

              <div className="flex flex-col gap-2">
                {photo ? (
                  <label
                    htmlFor="photo"
                    className="px-3 py-1.5 flex justify-center items-center w-fit border border-[#E4E4E7] dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-inter font-medium text-neutral-700 dark:text-neutral-300 rounded-lg gap-2 cursor-pointer transition-colors"
                  >
                    <GrPowerCycle className="w-3.5 h-3.5" />
                    Change Photo
                  </label>
                ) : (
                  <label
                    htmlFor="photo"
                    className="px-3 py-1.5 flex justify-center items-center w-fit border border-[#E4E4E7] dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-inter font-medium text-neutral-700 dark:text-neutral-300 rounded-lg gap-2 cursor-pointer transition-colors"
                  >
                    <RxUpload className="w-3.5 h-3.5" />
                    Upload Photo
                  </label>
                )}

                <button
                  type="button"
                  onClick={() => setPhoto(null)}
                  className="px-3 py-1.5 flex justify-center items-center w-fit border border-[#E4E4E7] dark:border-neutral-700 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-inter font-medium text-red-600 dark:text-red-400 rounded-lg gap-2 cursor-pointer transition-colors"
                >
                  <RxTrash className="w-3.5 h-3.5" />
                  Remove Photo
                </button>

                <input
                  type="file"
                  id="photo"
                  name="photo"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPhoto(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            </div>

            {/* Input Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="font-inter font-medium text-xs sm:text-sm text-secondary dark:text-neutral-400">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={user.fullName}
                className="bg-white dark:bg-neutral-800/70 border border-[#E4E4E7] dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-primary dark:focus:border-primary transition-colors"
                {...register("fullName")}
              />
            </div>

            {/* Input Location */}
            <div className="flex flex-col gap-1.5">
              <label className="font-inter font-medium text-xs sm:text-sm text-secondary dark:text-neutral-400">
                Location
              </label>
              <input
                type="text"
                placeholder="Your location..."
                defaultValue={user.location || ""}
                className="bg-white dark:bg-neutral-800/70 border border-[#E4E4E7] dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-primary dark:focus:border-primary transition-colors"
                {...register("location")}
              />
            </div>

            {/* Input Bio */}
            <div className="flex flex-col gap-1.5">
              <label className="font-inter font-medium text-xs sm:text-sm text-secondary dark:text-neutral-400">
                Bio
              </label>
              <textarea
                defaultValue={user.bio || ""}
                className="bg-white dark:bg-neutral-800/70 border border-[#E4E4E7] dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-primary dark:focus:border-primary transition-colors resize-none"
                placeholder="Tell the community a little about yourself..."
                rows={3}
                {...register("bio")}
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

export default EditModal;