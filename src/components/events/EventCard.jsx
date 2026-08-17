import { useState } from "react";
import { CiCalendar, CiBookmark } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { RxPeople } from "react-icons/rx";
import { Link } from "react-router";
import slugify from "slugify";

import { getProgressColor, formatEventDate } from "../../utils/event";
import { useAuth } from "../../hooks/useAuth";
import AuthPromptModal from "../shared/AuthPromptModal";

function EventCard({ events }) {
  const pct = Math.min(100, (events.attendees_count / events.capacity) * 100);
  const isFull = events.attendees_count >= events.capacity;

  const { isAttendee } = useAuth();
  const [showPrompt, setShowPrompt] = useState(false);

  const handleJoin = () => console.log("join event", events.id);
  const handleSave = () => console.log("save event", events.id);

  return (
    <article className="border-2 border-[#E4E4E7] rounded-xl overflow-hidden flex flex-col bg-white">
      {(() => {
        const slug = slugify(events.title, { lower: true });
        return (
          <Link to={`/events/${slug}`}>
            <div className="relative">
              <img
                src={events.image_url}
                alt={events.title}
                className="rounded-t-xl w-full h-44 object-cover"
              />
            </div>

            <div className="p-4 flex flex-col grow justify-between gap-4">
              <div className="flex flex-col gap-3">
                <p className="font-jakarta font-semibold text-base text-gray-900 line-clamp-2">
                  {events.title}
                </p>

                <p className="font-inter font-normal text-xs text-secondary line-clamp-2">
                  {events.overview}
                </p>

                <div className="flex flex-col gap-1.5">
                  <div className="flex gap-2 items-center">
                    <CiCalendar className="text-secondary shrink-0 text-base" />
                    <p className="text-secondary font-inter font-normal text-xs truncate">
                      {formatEventDate(events.date)}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <IoLocationOutline className="text-secondary shrink-0 text-base" />
                    <p className="text-secondary font-inter font-normal text-xs truncate">
                      {events.location}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <RxPeople className="text-secondary shrink-0 text-base" />
                    <p className="text-secondary font-inter font-normal text-xs">
                      {events.attendees_count}/{events.capacity} attendees
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-auto pt-2">
                <div>
                  <div className="flex justify-between mb-1 text-xs">
                    <span className="font-medium text-body">
                      {events.attendees_count} Attendees
                    </span>
                    <span className="font-medium text-body">
                      {events.capacity} Capacity
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`${getProgressColor(pct)} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  {isFull ? (
                    <div className="grow text-center bg-neutral-300 text-neutral-500 rounded-lg py-2 px-3 font-inter font-medium text-sm cursor-not-allowed">
                      Full
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        isAttendee ? handleJoin() : setShowPrompt(true)
                      }
                      className="grow text-center bg-primary hover:opacity-95 transition-opacity rounded-lg text-white py-2 px-3 font-inter font-medium text-sm cursor-pointer"
                    >
                      Join Event
                    </div>
                  )}
                  <div
                    onClick={() =>
                      isAttendee ? handleSave() : setShowPrompt(true)
                    }
                    className="border-2 border-[#E4E4E7] p-2.5 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    <CiBookmark className="text-lg text-gray-700" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })()}

      {showPrompt && <AuthPromptModal onClose={() => setShowPrompt(false)} />}
    </article>
  );
}

export default EventCard;
