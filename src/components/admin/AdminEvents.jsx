import { useSelector } from "react-redux";

function AdminEvents() {
  const { events } = useSelector((state) => state.eventState);

  function getBadgeColor(pct) {
    if (pct >= 100) return "bg-[#FFE2E2] text-[#E7000B]";
    if (pct >= 80) return "bg-[#ffc04233] text-[#FFC042]";
    return "bg-[#33B5701A] text-[#33B570]";
  }

  return (
    <>
      {events.map((event) => {
        const pct = Math.min(
          100,
          ((event.attendees_count || 0) / event.capacity) * 100,
        );

        return (
          <div className="px-4 py-4 flex gap-4 items-center border border-[#E4E4E7] rounded-xl mb-3">
            <img src={event.image_url} className="w-12 h-10 rounded-lg" />
            <div className="grow">
              <p className="font-inter font-medium text-sm text-[#18181B] leading-5">
                {event.title}
              </p>
              <p className="font-inter font-normal text-xs text-secondary leading-4">
                {event.date} · {event.location}
              </p>
            </div>
            <div className="flex gap-2 items-center h-6">
              <p className="font-inter font-normal text-secondary text-xs">
                {event.attendees_count || 0}/{event.capacity}
              </p>
              <div
                className={`${getBadgeColor(pct)} px-2 py-0.5 rounded-full w-fit h-fit flex items-center justify-center font-inter font-medium text-xs leading-4`}
              >
                {pct >= 100 ? "Full" : pct >= 80 ? "Almost Full" : "Active"}
              </div>
              <button className="text-[#9F9FA9] text-2xl flex items-center cursor-pointer h-fit">
                ...
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default AdminEvents;
