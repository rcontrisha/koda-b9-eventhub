import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep, updateField } from "../../redux/slices/EventForm";

function Detail() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.eventState);
  // const { formData, updateFields, prevStep, nextStep } = useEventContext();
  const [format, setFormat] = useState(
    state.event.location === "online" ? "online" : "in-person",
  );

  return (
    <>
      <div>
        <h2 className="font-jakarta font-bold text-xl leading-7">
          Date, Location, and Capacity
        </h2>
        <p className="font-inter font-normal text-sm text-secondary leading-5">
          When and where is your event?
        </p>
      </div>
      <div className="pt-6 flex flex-col gap-1.5">
        <label htmlFor="date">Event Date</label>
        <input
          type="date"
          name="date"
          id="date"
          className="px-3 py-2.5 rounded-lg border border-[#E4E4E7] focus:outline-2 focus:outline-gray-400"
          value={state.event.date}
          onChange={(e) =>
            dispatch(updateField({ ...state.event, date: e.target.value }))
          }
        />
      </div>
      <div className="pt-6 flex gap-4">
        <div className="flex flex-col gap-1.5 grow">
          <label htmlFor="start_time">Start Time</label>
          <input
            type="time"
            name="start_time"
            id="start_time"
            className="px-3 py-2.5 rounded-lg border border-[#E4E4E7] focus:outline-2 focus:outline-gray-400"
            value={state.event.start_time}
            onChange={(e) =>
              dispatch(updateField({ ...state.event, start_time: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col gap-1.5 grow">
          <label htmlFor="end_time">End Time</label>
          <input
            type="time"
            name="end_time"
            id="end_time"
            className="px-3 py-2.5 rounded-lg border border-[#E4E4E7] focus:outline-2 focus:outline-gray-400"
            value={state.event.end_time}
            onChange={(e) =>
              dispatch(updateField({ ...state.event, end_time: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="pt-6">
        <label className="block mb-2 font-medium text-sm">Event Format</label>

        <div className="flex p-1 bg-[#F4F4F5] rounded-xl border border-[#E4E4E7] w-fit">
          <button
            type="button"
            onClick={() => {
              setFormat("in-person");
              dispatch(updateField({ ...state.event, location: "" }));
              // setFormData((prev) => {
              //   return {
              //     ...prev,
              //     location: "",
              //   };
              // });
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              format === "in-person"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <span>📍</span>
            In Person
          </button>

          <button
            type="button"
            onClick={() => {
              setFormat("online");
              dispatch(updateField({ ...state.event, location: "online" }));
              // setFormData((prev) => {
              //   return {
              //     ...prev,
              //     location: "online",
              //   };
              // });
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              format === "online"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <span>💻</span>
            Online
          </button>
        </div>
      </div>
      <div className="pt-6 flex flex-col gap-1.5">
        <label htmlFor="location">Location</label>
        <input
          disabled={format === "online" && true}
          type="text"
          name="location"
          id="location"
          placeholder="Bandung, West Java"
          className={`px-3 py-2.5 rounded-lg border border-[#E4E4E7] focus:outline-2 focus:outline-gray-400 ${format === "online" && "bg-gray-300 text-secondary"}`}
          value={state.event.location}
          onChange={(e) =>
            dispatch(updateField({ ...state.event, location: e.target.value }))
          }
        />
      </div>
      <div className="pt-6 flex flex-col gap-1.5">
        <label htmlFor="capacity">Capacity</label>
        <input
          type="number"
          name="capacity"
          id="capacity"
          placeholder="100"
          className="px-3 py-2.5 rounded-lg border border-[#E4E4E7] focus:outline-2 focus:outline-gray-400"
          value={state.event.capacity}
          onChange={(e) =>
            dispatch(updateField({ ...state.event, capacity: e.target.value }))
          }
        />
      </div>
      <div className="pt-8">
        <div className="pt-6 border-t border-t-[#E4E4E7] flex justify-between">
          <button
            onClick={() => {
              dispatch(prevStep());
            }}
            className="flex gap-2 px-4 py-2 rounded-lg items-center cursor-pointer border border-[#E4E4E7]"
          >
            <FiArrowLeft />
            Previous
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

export default Detail;
