import EventCard from "../components/events/EventCard";
import FilterButton from "../components/shared/FilterButton";
import SearchBar from "../components/shared/SearchBar";
import events from "../data/events.json";

function Event() {
  return (
    <>
      <div className="py-4 px-6 border-b border-b-[#E4E4E7] flex gap-3 items-center">
        <SearchBar placeholder={"Search events..."} showButton={false} />
        <FilterButton />
      </div>
      <section className="py-6 px-13">
        <p className="font-inter font-semibold text-sm text-secondary">
          {events.length}
          <span className="font-inter font-normal text-sm text-secondary">
            {" "}
            events found
          </span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
          {events.map((event) => {
            return <EventCard events={event} />;
          })}
        </div>
        <div className="pt-8 flex items-center justify-center">
          <div className="w-fit px-4 py-2 border border-[#E4E4E7] rounded-lg font-inter font-medium text-sm text-secondary cursor-pointer">
            Load More Events
          </div>
        </div>
      </section>
    </>
  );
}

export default Event;
