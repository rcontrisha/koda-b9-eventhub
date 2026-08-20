import { FiUploadCloud, FiArrowRight, FiTrash2 } from "react-icons/fi";
import { useState } from "react";

import tags from "../../data/tags.json";
import { useEventContext } from "../../hooks/useEventContext";

function BasicInformation() {
  const [isOpen, setIsOpen] = useState(false);
  const { formData, updateFields, nextStep } = useEventContext();

  const handleRemoveImage = () => {
    if (formData.image_url) {
      URL.revokeObjectURL(formData.image_url);
    }
    updateFields({image_url: ""})
    // setFormData((prev) => ({
    //   ...prev,
    //   image_url: null,
    // }));
  };

  return (
    <>
      <div>
        <h2 className="font-jakarta font-bold text-xl leading-7">
          Basic Information
        </h2>
        <p className="font-inter font-normal text-sm text-secondary leading-5">
          Tell attendees what your event is about.
        </p>
      </div>
      <div className="pt-6">
        <p className="font-inter font-medium text-sm leading-5 text-[#3F3F47]">
          Cover Image
        </p>
        <div className="pt-1.5">
          {formData.image_url ? (
            <div className="relative w-full h-48 border border-[#E4E4E7] rounded-xl overflow-hidden group">
              <img
                src={formData.image_url}
                alt="Event Cover Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <label
                  htmlFor="image_url"
                  className="px-3 py-2 bg-white text-gray-800 rounded-lg text-xs font-medium hover:bg-gray-100 transition cursor-pointer"
                >
                  Change Image
                </label>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg flex items-center gap-1.5 text-xs font-medium hover:bg-red-700 transition cursor-pointer"
                >
                  <FiTrash2 /> Remove
                </button>
              </div>
            </div>
          ) : (
            <label htmlFor="image_url" className="cursor-pointer">
              <div className="w-full h-36 border-2 border-[#E4E4E7] border-dashed p-8 rounded-xl flex flex-col gap-2 justify-center items-center hover:bg-gray-50 transition">
                <FiUploadCloud className="w-6 h-6 text-secondary" />
                <p className="font-inter font-normal text-sm text-[#9F9FA9] leading-5">
                  Click to upload or drag and drop
                </p>
                <p className="font-inter font-normal text-sm text-[#9F9FA9] leading-5">
                  PNG, JPG up to 10MB · 16:9 recommended
                </p>
              </div>
            </label>
          )}

          <input
            className="hidden"
            type="file"
            name="image_url"
            id="image_url"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                if (formData.image_url) {
                  URL.revokeObjectURL(formData.image_url);
                }
                updateFields({
                  image_url: URL.createObjectURL(e.target.files[0]),
                });
                // setFormData((prev) => ({
                //   ...prev,
                //   image_url: URL.createObjectURL(e.target.files[0]),
                // }));
              }
            }}
          />
        </div>
      </div>
      <div className="pt-6 flex flex-col gap-1.5">
        <label htmlFor="title">Event Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Go Concurrency Workshop"
          className="px-3 py-2.5 rounded-lg border border-[#E4E4E7] focus:outline-2 focus:outline-gray-400"
          value={formData.title}
          onChange={(e) => updateFields({ title: e.target.value })}
        />
      </div>
      <div className="pt-6 flex flex-col gap-1.5">
        <label htmlFor="desc">Description</label>
        <textarea
          name="desc"
          id="desc"
          placeholder="What will attendees learn or experience?"
          rows={5}
          className="px-3 py-2.5 rounded-lg border border-[#E4E4E7] focus:outline-2 focus:outline-gray-400"
          value={formData.desc}
          onChange={(e) => updateFields({ desc: e.target.value })}
        />
      </div>
      <div className="pt-6 flex flex-col gap-1.5">
        <p>Category</p>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-2.5 rounded-lg border border-[#E4E4E7] focus:outline-2 focus:outline-gray-400"
        >
          Select category
          {isOpen &&
            tags.map((tag) => {
              return <div>{tag}</div>;
            })}
        </div>
      </div>
      <div className="pt-6 flex flex-col gap-1.5">
        <p>Community (Optional)</p>
        <select className="px-3 py-2.5 rounded-lg border border-[#E4E4E7] focus:outline-2 focus:outline-gray-400">
          <option>No Community</option>
        </select>
      </div>
      <div className="pt-8">
        <div className="pt-6 border-t border-t-[#E4E4E7] flex justify-between">
          <button className="cursor-pointer">Cancel</button>
          <button
            onClick={nextStep}
            className="flex gap-2 px-4 py-2 rounded-lg bg-primary text-white items-center cursor-pointer"
          >
            Continue
            <FiArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}

export default BasicInformation;
