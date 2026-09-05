import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { RxCross2, RxCheck } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import {
  updateField,
  prevStep,
  submitAndRedirect,
  addEvent,
  editEvent,
  resetForm,
} from "../../redux/slices/EventSlice";
import { formatEventDate } from "../../utils/event";

function Review({ isEditing = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.eventState);

  const speakers = state.event.speakers || [];

  const [speakerInput, setSpeakerInput] = useState({
    name: "",
    role: "",
    company: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSpeakerInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitEvent = async () => {
    console.log("Submitted Event Data:", state.event);
    try {
      if (isEditing) {
        await dispatch(editEvent(state.event)).unwrap();
      } else {
        await dispatch(addEvent(state.event)).unwrap();
      }

      dispatch(submitAndRedirect());
      // navigate("/events");
      setTimeout(() => {
        navigate("/organizer"); 
        dispatch(resetForm())
      }, 2000);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleAddSpeaker = () => {
    if (!speakerInput.name.trim()) return;

    const newSpeaker = {
      name: speakerInput.name.trim(),
      role: speakerInput.role.trim() || "Speaker",
      company: speakerInput.company.trim() || "-",
      avatar_url:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=0",
    };

    const updatedSpeakers = [...speakers, newSpeaker];
    dispatch(updateField({ speakers: updatedSpeakers }));

    setSpeakerInput({
      name: "",
      role: "",
      company: "",
    });
  };

  const handleRemoveSpeaker = (indexToRemove) => {
    const updatedSpeakers = speakers.filter(
      (_, index) => index !== indexToRemove,
    );
    dispatch(updateField({ speakers: updatedSpeakers }));
  };

  return (
    <>
      <div>
        <h2 className="font-jakarta font-bold text-xl leading-7">
          Speakers and Review
        </h2>
        <p className="font-inter font-normal text-sm text-secondary leading-5">
          Add speakers and confirm your event details.
        </p>
      </div>

      <div className="pt-6">
        <label className="font-inter font-medium text-sm text-[#3F3F47]">
          Speakers (optional)
        </label>
        <div className="flex flex-col md:flex-row pt-2 gap-2">
          <input
            type="text"
            name="name"
            id="name"
            value={speakerInput.name}
            onChange={handleInputChange}
            placeholder="Speaker name"
            className="grow px-3 py-2.5 rounded-lg border border-[#E4E4E7] focus:outline-2 focus:outline-gray-400 text-sm"
          />
          <input
            type="text"
            name="role"
            id="role"
            value={speakerInput.role}
            onChange={handleInputChange}
            placeholder="Speaker's role (e.g. Lead Dev)"
            className="grow px-3 py-2.5 rounded-lg border border-[#E4E4E7] focus:outline-2 focus:outline-gray-400 text-sm"
          />
          <input
            type="text"
            name="company"
            id="company"
            value={speakerInput.company}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSpeaker();
              }
            }}
            placeholder="Company (e.g. Google)"
            className="grow px-3 py-2.5 rounded-lg border border-[#E4E4E7] focus:outline-2 focus:outline-gray-400 text-sm"
          />
          <button
            type="button"
            onClick={handleAddSpeaker}
            className="px-5 py-2.5 rounded-lg border border-[#E4E4E7] font-inter font-medium text-sm text-[#3F3F47] leading-5 hover:bg-gray-50 transition cursor-pointer"
          >
            Add
          </button>
        </div>

        {speakers.length > 0 && (
          <div className="pt-3 flex flex-wrap gap-2">
            {speakers.map((speaker, index) => {
              const name = typeof speaker === "object" ? speaker.name : speaker;
              const role = typeof speaker === "object" ? speaker.role : "";
              const company =
                typeof speaker === "object" ? speaker.company : "";

              return (
                <div
                  key={index}
                  className="flex justify-between gap-3 items-center px-3 py-1.5 bg-gray-50 border border-[#E4E4E7] rounded-lg text-sm text-gray-800"
                >
                  <div className="flex flex-col text-left">
                    <span className="font-semibold text-xs">{name}</span>
                    {(role || company) && (
                      <span className="text-[11px] text-gray-500">
                        {role} {company && role ? `at ${company}` : company}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveSpeaker(index)}
                    className="text-gray-400 hover:text-red-600 font-bold cursor-pointer"
                  >
                    <RxCross2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="pt-6">
        <div className="border border-[#E4E4E7] rounded-xl">
          <div className="flex justify-between px-4 py-3 border-b border-b-gray-100">
            <p className="font-inter font-medium text-xs text-secondary leading-4">
              Title
            </p>
            <p className="text-sm font-semibold">{state.event.title || "-"}</p>
          </div>
          <div className="flex justify-between px-4 py-3 border-b border-b-gray-100">
            <p className="font-inter font-medium text-xs text-secondary leading-4">
              Category
            </p>
            <p className="text-sm">
              {state.event.tags?.length > 0
                ? state.event.tags.join(", ")
                : "No Categories Added"}
            </p>
          </div>
          <div className="flex justify-between px-4 py-3 border-b border-b-gray-100">
            <p className="font-inter font-medium text-xs text-secondary leading-4">
              Date
            </p>
            <p className="text-sm">
              {state.event.date ? formatEventDate(state.event.date) : "-"}
            </p>
          </div>
          <div className="flex justify-between px-4 py-3 border-b border-b-gray-100">
            <p className="font-inter font-medium text-xs text-secondary leading-4">
              Time
            </p>
            <p className="text-sm">
              {state.event.start_time || "-"} - {state.event.end_time || "-"}
            </p>
          </div>
          <div className="flex justify-between px-4 py-3 border-b border-b-gray-100">
            <p className="font-inter font-medium text-xs text-secondary leading-4">
              Format (Location)
            </p>
            <p className="text-sm">{state.event.location || "-"}</p>
          </div>
          <div className="flex justify-between px-4 py-3 border-b border-b-gray-100">
            <p className="font-inter font-medium text-xs text-secondary leading-4">
              Capacity
            </p>
            <p className="text-sm">{state.event.capacity || 0} persons</p>
          </div>
          <div className="flex justify-between px-4 py-3">
            <p className="font-inter font-medium text-xs text-secondary leading-4">
              Speakers
            </p>
            <p className="text-sm">
              {speakers.length > 0
                ? speakers
                    .map((s) =>
                      typeof s === "object"
                        ? `${s.name} (${s.role}${s.company ? `, ${s.company}` : ""})`
                        : s,
                    )
                    .join("; ")
                : "No Speakers Added"}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <div className="pt-6 border-t border-t-[#E4E4E7] flex justify-between">
          <button
            type="button"
            onClick={() => dispatch(prevStep())}
            disabled={state.isPending}
            className="flex gap-2 px-4 py-2 rounded-lg items-center cursor-pointer border border-[#E4E4E7] disabled:opacity-50"
          >
            <FiArrowLeft />
            Previous
          </button>
          <button
            type="button"
            onClick={handleSubmitEvent}
            disabled={state.isPending}
            className="flex gap-2 px-4 py-2 rounded-lg bg-[#33B570] text-white items-center cursor-pointer disabled:opacity-50"
          >
            <RxCheck className="w-5 h-5" />
            {state.isPending
              ? "Saving..."
              : isEditing
                ? "Commit Changes"
                : "Publish Event"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Review;
