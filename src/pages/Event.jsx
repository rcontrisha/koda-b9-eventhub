import { useState } from "react";
import EventCard from "../components/events/EventCard";
import FilterButton from "../components/shared/FilterButton";
import InputField from "../components/shared/InputField";
import events from "../data/events.json";

function Event() {
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleEvents = events.slice(0, visibleCount);
  return (
    <>
      <div className="py-4 px-6 border-b border-b-[#E4E4E7] flex gap-3 items-center">
        <InputField placeholder={"Search events..."} />
        <FilterButton />
      </div>
      <section className="px-4 py-8 lg:py-10 lg:px-13">
        <p className="font-inter font-semibold text-sm text-secondary">
          {events.length}
          <span className="font-inter font-normal text-sm text-secondary">
            {" "}
            events found
          </span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
          {visibleEvents.map((event, idx) => {
            return <EventCard key={idx} events={event} />;
          })}
        </div>
        {visibleCount < events.length && (
          <div className="pt-8 flex items-center justify-center">
            <div
              onClick={() => setVisibleCount((c) => c + 6)}
              className="w-fit px-4 py-2 border border-[#E4E4E7] rounded-lg font-inter font-medium text-sm text-secondary cursor-pointer"
            >
              Load More Events
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Event;
