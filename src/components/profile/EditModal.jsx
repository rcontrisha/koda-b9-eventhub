import { useForm } from "react-hook-form";
import { RxCross2, RxUpload, RxTrash } from "react-icons/rx";
import { GrPowerCycle } from "react-icons/gr";
import { useState } from "react";

import { useAuth } from "../../hooks/useAuth";

function EditModal({ onClose }) {
  const { user, editProfile } = useAuth();
  const { register, handleSubmit } = useForm();
  const [photo, setPhoto] = useState(user.photo || null);

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
            editProfile({
              fullName: form.fullName,
              location: form.location,
              bio: form.bio,
              photo: photo,
            });
          })}
        >
          <div className="p-6">
            <div className="flex gap-2 items-center justify-start w-full">
              <div className="w-20 h-20 bg-secondary text-white rounded-2xl flex items-center justify-center font-semibold text-lg shrink-0">
                {photo ? (
                  <img src={photo} className="w-full h-full" />
                ) : (
                  user.fullName[0]
                )}
              </div>
              <div className="flex flex-col gap-2">
                {photo ? (
                  <label
                    htmlFor="photo"
                    className="px-3 py-1.5 flex justify-center items-center w-fit border border-[#E4E4E7] text-sm text-secondary font-inter font-medium rounded-lg gap-2 cursor-pointer"
                  >
                    <GrPowerCycle />
                    Change Photo
                  </label>
                ) : (
                  <label
                    htmlFor="photo"
                    className="px-3 py-1.5 flex justify-center items-center w-fit border border-[#E4E4E7] text-sm text-secondary font-inter font-medium rounded-lg gap-2 cursor-pointer"
                  >
                    <RxUpload />
                    Upload Photo
                  </label>
                )}
                <button
                  onClick={() => setPhoto(null)}
                  className="px-3 py-1.5 flex justify-center items-center w-fit border border-[#E4E4E7] text-sm text-secondary font-inter font-medium rounded-lg gap-2 cursor-pointer"
                >
                  <RxTrash />
                  Remove Photo
                </button>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (photo) {
                      URL.revokeObjectURL(photo);
                    }
                    setPhoto(() => URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </div>
            </div>
            <div>
              <div className="pt-4 flex flex-col gap-1.5">
                <label className="font-inter font-medium text-sm text-secondary">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user.fullName}
                  className="border border-[#E4E4E7] px-3 py-2.5 rounded-lg focus:outline-gray-400"
                  {...register("fullName")}
                />
              </div>
              <div className="pt-4 flex flex-col gap-1.5">
                <label className="font-inter font-medium text-sm text-secondary">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Your location..."
                  defaultValue={user.location || ''}
                  className="border border-[#E4E4E7] px-3 py-2.5 rounded-lg focus:outline-gray-400"
                  {...register("location")}
                />
              </div>
              <div className="pt-4 flex flex-col gap-1.5">
                <label className="font-inter font-medium text-sm text-secondary">
                  Bio
                </label>
                <textarea
                  defaultValue={user.bio || ''}
                  className="border border-[#E4E4E7] px-3 py-2.5 rounded-lg focus:outline-gray-400"
                  placeholder="Tell the community a little about yourself..."
                  rows={3}
                  {...register("bio")}
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
              className="w-fit text-center bg-primary text-white py-2 px-4 rounded-lg font-inter text-sm"
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
