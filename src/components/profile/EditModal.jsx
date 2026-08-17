// import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../../hooks/useAuth";

function EditModal({ onClose }) {
  const { user } = useAuth();
  // const { register, handleSubmit } = useForm();

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
        <div className="p-6">
          <div>
            <div></div>
            <div>
              <div class="flex items-center justify-center w-full">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full bg-neutral-secondary-medium border border-solid border-[#E4E4E7] rounded-lg cursor-pointer hover:bg-neutral-tertiary-medium"
                >
                  <div class="flex flex-col items-center justify-center text-body py-2">
                    <svg
                      class="w-8 h-8 mb-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
                      />
                    </svg>
                    <p class="mb-2 text-sm">
                      <span class="font-semibold">Click to upload</span> (SVG,
                      PNG, or JPG)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" />
                </label>
              </div>
            </div>
          </div>
          <form>
            <div className="pt-4 flex flex-col gap-1.5">
              <label className="font-inter font-medium text-sm text-secondary">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={user.fullName}
                className="border border-[#E4E4E7] px-3 py-2.5 rounded-lg focus:outline-gray-400"
              />
            </div>
            <div className="pt-4 flex flex-col gap-1.5">
              <label className="font-inter font-medium text-sm text-secondary">
                Location
              </label>
              <input
                type="text"
                placeholder="Your location..."
                className="border border-[#E4E4E7] px-3 py-2.5 rounded-lg focus:outline-gray-400"
              />
            </div>
            <div className="pt-4 flex flex-col gap-1.5">
              <label className="font-inter font-medium text-sm text-secondary">
                Bio
              </label>
              <textarea
                className="border border-[#E4E4E7] px-3 py-2.5 rounded-lg focus:outline-gray-400"
                placeholder="Tell the community a little about yourself..."
                rows={3}
              />
            </div>
          </form>
        </div>
        <div className="flex gap-3 p-6 pt-0 justify-end">
          <button
            onClick={onClose}
            className="w-fit py-2 px-4 border border-[#E4E4E7] text-secondary rounded-lg font-inter text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            // onClick={onClose}
            className="w-fit text-center bg-primary text-white py-2 px-4 rounded-lg font-inter text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
