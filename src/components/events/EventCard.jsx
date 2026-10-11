import { useState } from "react";
import { CiCalendar, CiBookmark } from "react-icons/ci";
import { IoLocationOutline, IoCheckmark } from "react-icons/io5";
import { RxPeople } from "react-icons/rx";
import { Link } from "react-router";
// import slugify from "slugify";
import { GoBookmarkFill } from "react-icons/go";
import { toast } from "sonner";

import { getProgressColor, formatEventDate } from "../../utils/event";
import { useAuth } from "../../hooks/useAuth";
import AuthPromptModal from "../shared/AuthPromptModal";

function EventCard({ events }) {
  const pct = Math.min(
    100,
    ((events.attendees_count || 0) / events.capacity) * 100,
  );
  const isFull = events.attendees_count >= events.capacity;
  const now = new Date();

  const { role, joinEvent, hasJoinedEvent, saveEvent, hasSavedEvent } =
    useAuth();
  const [showPrompt, setShowPrompt] = useState(false);
  const [joining, setJoining] = useState(false);

  const joined = hasJoinedEvent(events.id);
  const ended = new Date(events.end_time) < now;
  const saved = hasSavedEvent(events.id);

  const handleToggleJoin = async () => {
    if (role !== "attendee") {
      setShowPrompt(true);
      return;
    }

    setJoining(true);
    try {
      const res = await joinEvent(events.id);
      toast.success(res?.message || "Success");
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Something went wrong");
    } finally {
      setJoining(false);
    }
  };

  const handleSave = () => {
    if (role !== "attendee") {
      setShowPrompt(true);
      return;
    }
    saveEvent(events.id);
    if (saved) {
      toast.error("Removed from 'Saved' List");
    } else {
      toast.success("Added to 'Saved' List");
    }
  };

  return (
    <article className="bg-white dark:bg-neutral-900 dark:border-neutral-800 border-2 border-[#E4E4E7] rounded-xl overflow-hidden flex flex-col">
      <Link to={`/events/${events.id}`}>
        <div className="relative">
          <img
            src={`${events.image_url.startsWith("https") ? events.image_url + "&w=400&auto=format" : events.image_url}`}
            alt={events.title}
            className="rounded-t-xl w-full h-44 object-cover"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col grow justify-between gap-4">
        <div className="flex flex-col gap-3">
          <p className="font-jakarta font-semibold text-base text-gray-900 dark:text-neutral-100 line-clamp-2">
            {events.title}
          </p>

          <div className="flex flex-col gap-1.5">
            <div className="flex gap-2 items-center">
              <CiCalendar className="text-secondary shrink-0 text-base" />
              <p className="text-secondary font-inter font-normal text-xs truncate">
                {formatEventDate(events.start_time)}
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
                {events.attendees_count || 0}/{events.capacity} attendees
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-auto pt-2">
          <div>
            <div className="flex justify-between mb-1 text-xs">
              <span className="font-medium text-body">
                {events.attendees_count || 0} Attendees
              </span>
              <span className="font-medium text-body">
                {events.capacity} Capacity
              </span>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
              <div
                className={`${getProgressColor(pct)} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${pct}%` }}
              ></div>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            {ended ? (
              <div className="grow text-center bg-neutral-300 dark:bg-neutral-800 text-neutral-500 rounded-lg py-2 px-3 font-inter font-medium text-sm cursor-not-allowed">
                Event has ended
              </div>
            ) : joined ? (
              <button
                onClick={handleToggleJoin}
                disabled={joining}
                className="group grow flex items-center justify-center gap-1.5 bg-[#33B570] hover:bg-red-500 dark:bg-neutral-800 text-white rounded-lg py-2 px-3 font-inter font-medium text-sm cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {joining ? (
                  "..."
                ) : (
                  <>
                    <span className="flex items-center gap-1.5 group-hover:hidden">
                      <IoCheckmark />
                      Registered
                    </span>
                    <span className="hidden group-hover:inline">
                      Leave Event
                    </span>
                  </>
                )}
              </button>
            ) : isFull ? (
              <div className="grow text-center bg-neutral-300 dark:bg-neutral-800 text-neutral-500 rounded-lg py-2 px-3 font-inter font-medium text-sm cursor-not-allowed">
                Full
              </div>
            ) : (
              <button
                onClick={handleToggleJoin}
                disabled={joining}
                className="grow text-center bg-primary hover:opacity-95 transition-opacity rounded-lg text-white py-2 px-3 font-inter font-medium text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {joining ? "..." : "Join Event"}
              </button>
            )}
            <button
              onClick={handleSave}
              className="dark:border-neutral-800 border-2 border-[#E4E4E7] p-2.5 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center"
            >
              {saved ? (
                <GoBookmarkFill className="text-lg text-primary" />
              ) : (
                <CiBookmark className="text-lg text-gray-700 dark:text-neutral-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {showPrompt && <AuthPromptModal onClose={() => setShowPrompt(false)} />}
    </article>
  );
}

export default EventCard;