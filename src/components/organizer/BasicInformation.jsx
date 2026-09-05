import { FiUploadCloud, FiArrowRight, FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import communities from "../../data/communities.json";
import tagList from "../../data/tags.json";
// import { useEventContext } from "../../hooks/useEventContext";
import {
  updateField,
  nextStep,
  resetForm,
} from "../../redux/slices/EventSlice";

function BasicInformation() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.eventState);
  // const { formData, updateFields } = useEventContext();
  const [tags, setTags] = useState(state.event.tags || []);
  const navigate = useNavigate();

  useEffect(() => {
    (() => {
      if (state.event.tags.length > 0) {
        setTags(state.event.tags);
      }
    })();
  }, [state.event.tags]);

  const handleRemoveImage = () => {
    // if (state.event.image_url) {
    //   URL.revokeObjectURL(state.event.image_url);
    // }
    dispatch(updateField({ ...state.event, image_url: "" }));
    // setFormData((prev) => ({
    //   ...prev,
    //   image_url: null,
    // }));
  };

  const handleTagChange = (e) => {
    const selectedTag = e.target.value;
    if (!selectedTag) return;

    if (!tags.includes(selectedTag)) {
      const updatedTags = [...tags, selectedTag];
      setTags(updatedTags);
      dispatch(updateField({ ...state.event, tags: updatedTags }));
    }

    e.target.value = "";
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    dispatch(updateField({ ...state.event, tags: updatedTags }));
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
          {state.event.image_url ? (
            <div className="relative w-full h-48 border border-[#E4E4E7] rounded-xl overflow-hidden group">
              <img
                src={state.event.image_url}
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
                // if (state.event.image_url) {
                //   URL.revokeObjectURL(state.event.image_url);
                // }
                const reader = new FileReader();
                reader.onloadend = () => {
                  dispatch(
                    updateField({
                      ...state.event,
                      image_url: reader.result,
                    }),
                  );
                };
                reader.readAsDataURL(e.target.files[0])
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
          value={state.event.title}
          onChange={(e) =>
            dispatch(updateField({ ...state.event, title: e.target.value }))
          }
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
          value={state.event.desc}
          onChange={(e) =>
            dispatch(updateField({ ...state.event, desc: e.target.value }))
          }
        />
      </div>
      <div className="pt-6 flex flex-col gap-1.5">
        <p>Category</p>
        <div className="w-full relative block">
          <select
            defaultValue=""
            onChange={handleTagChange}
            className="w-full overflow-hidden whitespace-nowrap px-3 py-2.5 rounded-lg border border-[#E4E4E7] focus:outline-2 focus:outline-gray-400 text-sm bg-white cursor-pointer"
          >
            <option value="" disabled>
              Select Category
            </option>
            {tagList?.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          {/* Selected Tags Chips */}
          {tags?.length > 0 && (
            <div className="pt-2 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 border border-[#E4E4E7] rounded-lg text-xs font-medium text-gray-700"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-gray-400 hover:text-red-600 transition cursor-pointer"
                  >
                    <RxCross2 />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* <div
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-2.5 rounded-lg border border-[#E4E4E7] focus:outline-2 focus:outline-gray-400"
        >
          Select category
          {isOpen &&
            tags.map((tag) => {
              return <div>{tag}</div>;
            })}
        </div> */}
      </div>
      <div className="pt-6 flex flex-col gap-1.5">
        <p>Community (Optional)</p>
        <select
          value={state.event.community_id || ""}
          onChange={(e) =>
            dispatch(
              updateField({ ...state.event, community_id: e.target.value }),
            )
          }
          className="px-3 py-2.5 rounded-lg border border-[#E4E4E7] focus:outline-2 focus:outline-gray-400"
        >
          <option value="">No Community</option>
          {communities?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="pt-8">
        <div className="pt-6 border-t border-t-[#E4E4E7] flex justify-between">
          <button
            onClick={() => {
              dispatch(resetForm());
              navigate("/organizer");
            }}
            className="cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              dispatch(nextStep());
            }}
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
