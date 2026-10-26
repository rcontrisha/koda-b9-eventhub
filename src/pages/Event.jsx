import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import EventCard from "../components/events/EventCard";
import FilterButton from "../components/shared/FilterButton";
import InputField from "../components/shared/InputField";
import Filters from "../components/events/Filters";
import { getEvents } from "../redux/slices/EventSlice";

function Event() {
  const dispatch = useDispatch();
  const { events = [], total = 0, isPending, isRejected } = useSelector(
    (state) => state.eventState
  );

  const [filterOpen, setFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const query = searchParams.get("q") || "";
  const tag = searchParams.get("tag") || "";
  const loc = searchParams.get("loc") || "";

  const limit = 6;

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    const params = new URLSearchParams();
    if (query) params.set("search", query);
    if (tag) params.set("tag", tag);
    if (loc) params.set("location", loc);
    params.set("page", nextPage);
    params.set("limit", limit);

    dispatch(getEvents(`${import.meta.env.VITE_API_URL}/events?${params.toString()}`));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);

    const params = new URLSearchParams();
    if (query) params.set("search", query);
    if (tag) params.set("tag", tag);
    if (loc) params.set("location", loc);
    params.set("page", 1);
    params.set("limit", limit);

    dispatch(getEvents(`${import.meta.env.VITE_API_URL}/events?${params.toString()}`));
  }, [query, tag, loc, limit, dispatch]);

  return (
    <>
      <div className="py-4 px-6 border-b border-b-[#E4E4E7] dark:border-neutral-800 flex gap-3 items-center">
        <InputField
          placeholder={"Search events..."}
          value={query}
          onChange={(event) => {
            const value = event.target.value;
            const newParams = new URLSearchParams(searchParams);
            if (value) {
              newParams.set("q", value);
            } else {
              newParams.delete("q");
            }
            setSearchParams(newParams);
          }}
        />
        <FilterButton isOpen={filterOpen} clicked={setFilterOpen} />
      </div>

      {filterOpen && (
        <div className="px-6 py-4 border-b border-b-[#E4E4E7]">
          <Filters
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
      )}

      <section className="px-4 py-8 lg:py-10 lg:px-13 flex flex-col min-h-[calc(100vh-200px)]">
        {isPending && page === 1 && (
          <div className="flex items-center justify-center grow">
            <div className="w-14 h-14 border-4 border-neutral-200 dark:border-neutral-800 border-t-primary dark:border-t-primary rounded-full animate-spin"></div>
          </div>
        )}

        {(!isPending || page > 1) && !isRejected && (
          <>
            <p className="font-inter font-semibold text-sm text-secondary">
              {total}{" "}
              <span className="font-inter font-normal text-sm text-secondary">
                events found
              </span>
            </p>

            {events.length === 0 ? (
              <div className="text-center py-12 text-gray-500 font-inter">
                No events found matching your criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
                {events.map((event, idx) => (
                  <EventCard key={event.id || idx} events={event} />
                ))}
              </div>
            )}

            {events.length < total && (
              <div className="pt-8 flex items-center justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={isPending}
                  className="w-fit px-4 py-2 border border-[#E4E4E7] rounded-lg font-inter font-medium text-sm text-secondary hover:bg-gray-50 transition cursor-pointer disabled:opacity-50"
                >
                  {isPending ? "Loading..." : "Load More Events"}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}

export default Event;