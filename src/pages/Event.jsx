import { useState } from "react";
import { useSearchParams } from "react-router";

import EventCard from "../components/events/EventCard";
import FilterButton from "../components/shared/FilterButton";
import InputField from "../components/shared/InputField";
import events from "../data/events.json";
import Filters from "../components/events/Filters";

function Event() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const cat = searchParams.get("cat") || "";
  const loc = searchParams.get("loc") || "";

  const visibleEvents = events
    .filter((e) => {
      const matchTitle = e.title.toLowerCase().includes(query);
      const matchCat = !cat || e.tags.includes(cat)
      const matchLoc = !loc || e.location === loc
      return matchTitle && matchCat && matchLoc;
    })
    .slice(0, visibleCount);

  return (
    <>
      <div className="py-4 px-6 border-b border-b-[#E4E4E7] flex gap-3 items-center">
        <InputField
          placeholder={"Search events..."}
          value={query}
          onChange={(event) => {
            const value = event.target.value;
            if (value) {
              searchParams.set("q", value);
            } else {
              searchParams.delete("q");
            }
            setSearchParams(searchParams);
          }}
        />
        <FilterButton isOpen={filterOpen} clicked={setFilterOpen} />
      </div>
      {filterOpen && (
        <div className="px-6 py-4 border-b border-b-[#E4E4E7]">
          <Filters searchParams={searchParams} setSearchParams={setSearchParams} />
        </div>
      )}
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
