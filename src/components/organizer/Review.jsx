import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { RxCross2, RxCheck } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

// import { useEventContext } from "../../hooks/useEventContext";
import { updateField, prevStep, addEvent } from "../../redux/slices/EventForm";
import { formatEventDate } from "../../utils/event";

function Review() {
  // const {formData, updateFields, prevStep, submit} = useEventContext()
  const dispatch = useDispatch();
  const state = useSelector((state) => state.eventState);
  const [speakers, setSpeakers] = useState(state.event.speakers || []);
  const [inputSpeaker, setInputSpeaker] = useState("");

  const handleSubmitEvent = () => {
    console.log("Submitted Event Data:", state.event);
    dispatch(addEvent(state.event));
  };

  const handleAddSpeaker = () => {
    if (inputSpeaker.trim() === "") return;
    const updatedSpeakers = [...speakers, inputSpeaker];
    setSpeakers(updatedSpeakers);
    dispatch(updateField({ ...state.event, speakers: updatedSpeakers }));
    // setFormData((prev) => ({ ...prev, speakers: updatedSpeakers }));
    setInputSpeaker("");
  };

  const handleRemoveSpeaker = (indexToRemove) => {
    const updatedSpeakers = speakers.filter(
      (_, index) => index !== indexToRemove,
    );
    setSpeakers(updatedSpeakers);
    dispatch(updateField({ ...state.event, speakers: updatedSpeakers }));
    // setFormData((prev) => ({ ...prev, speakers: updatedSpeakers }));
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
        <label htmlFor="speaker">Speakers (optional)</label>
        <div className="flex pt-2 gap-1.5">
          <input
            type="text"
            name="speaker"
            id="speaker"
            value={inputSpeaker}
            onChange={(e) => setInputSpeaker(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSpeaker();
              }
            }}
            placeholder="Speaker name and title"
            className="grow px-3 py-2.5 rounded-lg border border-[#E4E4E7] focus:outline-2 focus:outline-gray-400 text-sm"
          />
          <button
            type="button"
            onClick={handleAddSpeaker}
            className="px-4 py-2.5 rounded-lg border border-[#E4E4E7] font-inter font-medium text-sm text-[#3F3F47] leading-5 hover:bg-gray-50 transition cursor-pointer"
          >
            Add
          </button>
        </div>

        {speakers?.length > 0 && (
          <div className="pt-3 flex gap-2">
            {speakers.map((speaker, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between gap-3 items-center px-2 py-1 bg-gray-50 border border-[#E4E4E7] rounded-lg text-sm text-gray-800 w-fit"
                >
                  <span>{speaker}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSpeaker(index)}
                    className="text-gray-400 hover:text-red-600 font-bold cursor-pointer"
                  >
                    <RxCross2 className="w-full h-full" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="pt-6">
        <div className="border border-[#E4E4E7] rounded-xl">
          <div className="flex justify-between px-4 py-3">
            <p className="font-inter font-medium text-xs text-secondary leading-4">
              Title
            </p>
            <p>{state.event.title}</p>
          </div>
          <div className="flex justify-between px-4 py-3">
            <p className="font-inter font-medium text-xs text-secondary leading-4">
              Category
            </p>
            <p>
              {state.event.tags.length > 0
                ? state.event.tags.join(", ")
                : "No Categories Added"}
            </p>
          </div>
          <div className="flex justify-between px-4 py-3">
            <p className="font-inter font-medium text-xs text-secondary leading-4">
              Date
            </p>
            <p>{formatEventDate(state.event.date)}</p>
          </div>
          <div className="flex justify-between px-4 py-3">
            <p className="font-inter font-medium text-xs text-secondary leading-4">
              Time
            </p>
            <p>
              {state.event.start_time} - {state.event.end_time}
            </p>
          </div>
          <div className="flex justify-between px-4 py-3">
            <p className="font-inter font-medium text-xs text-secondary leading-4">
              Format (Location)
            </p>
            <p>{state.event.location}</p>
          </div>
          <div className="flex justify-between px-4 py-3">
            <p className="font-inter font-medium text-xs text-secondary leading-4">
              Capacity
            </p>
            <p>{state.event.capacity} persons</p>
          </div>
          <div className="flex justify-between px-4 py-3">
            <p className="font-inter font-medium text-xs text-secondary leading-4">
              Speakers
            </p>
            <p>{state.event.speakers?.length > 0 ? state.event.speakers.join(", ") : ""}</p>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <div className="pt-6 border-t border-t-[#E4E4E7] flex justify-between">
          <button
            onClick={() => dispatch(prevStep())}
            className="flex gap-2 px-4 py-2 rounded-lg items-center cursor-pointer border border-[#E4E4E7]"
          >
            <FiArrowLeft />
            Previous
          </button>
          <button
            onClick={handleSubmitEvent}
            className="flex gap-2 px-4 py-2 rounded-lg bg-[#33B570] text-white items-center cursor-pointer"
          >
            <RxCheck />
            Publish Event
          </button>
        </div>
      </div>
    </>
  );
}

export default Review;
