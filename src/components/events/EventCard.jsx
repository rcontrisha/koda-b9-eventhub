import { CiCalendar, CiBookmark } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { RxPeople } from "react-icons/rx";

function EventCard({ event }) {
  return (
    <article className="border-2 border-[#E4E4E7] rounded-xl">
      <div className="relative">
        <img
          src={event.image_url}
          height={176}
          className="rounded-t-xl w-full"
        />
      </div>
      <div className="p-4 flex flex-col gap-3"> 
        <p className="font-jakarta font-semibold text-base">{event.title}</p>
        <div>
          <div className="flex gap-2 items-center">
            <CiCalendar />
            <p className="text-secondary font-inter font-normal text-xs">
              {event.date}
            </p>
          </div>
          <div className="flex gap-2 items-center pt-1.5">
            <IoLocationOutline />
            <p className="text-secondary font-inter font-normal text-xs">
              {event.location}
            </p>
          </div>
          <div className="flex gap-2 items-center pt-1.5">
            <RxPeople />
            <p className="text-secondary font-inter font-normal text-xs">
              {event.attendees_count}/{event.capacity} attendees
            </p>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-body">
              {event.attendees_count} Attendees
            </span>
            <span className="text-sm font-medium text-body">
              {event.capacity} Capacity
            </span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div
              className="bg-[#33B570] h-2 rounded-full"
              style={{
                width: `${Math.min(100, (event.attendees_count / event.capacity) * 100)}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="flex gap-2 pt-1 items-center">
          <div className="grow text-center bg-primary rounded-lg text-white py-1.5 px-3">Join Event</div>
          <div className="border-2 border-[#E4E4E7] p-2 rounded-lg">
            <CiBookmark />
          </div>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
