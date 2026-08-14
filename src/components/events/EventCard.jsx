import { CiCalendar, CiBookmark } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { RxPeople } from "react-icons/rx";

function getProgressColor(pct) {
  if (pct >= 100) return "bg-red-500";
  if (pct >= 80) return "bg-yellow-500";
  return "bg-[#33B570]";
}

function EventCard({ events }) {
  const pct = Math.min(100, (events.attendees_count / events.capacity) * 100);
  const isFull = events.attendees_count >= events.capacity;
  return (
    <article className="border-2 border-[#E4E4E7] rounded-xl">
      <div className="relative">
        <img
          src={events.image_url}
          height={176}
          className="rounded-t-xl w-full"
        />
      </div>
      <div className="p-4 flex flex-col gap-3"> 
        <p className="font-jakarta font-semibold text-base">{events.title}</p>
        <div>
          <div className="flex gap-2 items-center">
            <CiCalendar />
            <p className="text-secondary font-inter font-normal text-xs">
              {events.date}
            </p>
          </div>
          <div className="flex gap-2 items-center pt-1.5">
            <IoLocationOutline />
            <p className="text-secondary font-inter font-normal text-xs">
              {events.location}
            </p>
          </div>
          <div className="flex gap-2 items-center pt-1.5">
            <RxPeople />
            <p className="text-secondary font-inter font-normal text-xs">
              {events.attendees_count}/{events.capacity} attendees
            </p>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-body">
              {events.attendees_count} Attendees
            </span>
            <span className="text-sm font-medium text-body">
              {events.capacity} Capacity
            </span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div
              className={`${getProgressColor(pct)} h-2 rounded-full`}
              style={{ width: `${pct}%` }}
            ></div>
          </div>
        </div>
        <div className="flex gap-2 pt-1 items-center">
          {isFull ? (
            <div className="grow text-center bg-neutral-300 text-neutral-500 rounded-lg py-1.5 px-3 font-inter font-medium text-sm cursor-not-allowed">
              Full
            </div>
          ) : (
            <div className="grow text-center bg-primary rounded-lg text-white py-1.5 px-3 cursor-pointer">
              Join Event
            </div>
          )}
          <div className="border-2 border-[#E4E4E7] p-2 rounded-lg cursor-pointer">
            <CiBookmark />
          </div>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
