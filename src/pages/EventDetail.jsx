import { useState } from "react";
import { Link, useParams } from "react-router";
import { IoMdArrowBack, IoMdSend } from "react-icons/io";
import { CiCalendar, CiBookmark } from "react-icons/ci";
import { GoBookmarkFill } from "react-icons/go";
import { IoLocationOutline, IoShareSocialOutline, IoChatboxOutline, IoCheckmark } from "react-icons/io5";
import { RxPeople } from "react-icons/rx";
import slugify from 'slugify'

import EventCard from "../components/events/EventCard";
import InputField from "../components/shared/InputField";
import AuthPromptModal from "../components/shared/AuthPromptModal";
import { getProgressColor, formatEventDate } from "../utils/event";
import { useAuth } from "../hooks/useAuth";

import events from "../data/events.json";
import communities from "../data/communities.json";

function EventDetail() {
  const { slug } = useParams();

  const { isAttendee, joinEvent, hasJoinedEvent, saveEvent, hasSavedEvent } = useAuth();
  const [showPrompt, setShowPrompt] = useState(false);

  const event = events.find((e) => slugify(e.title, { lower: true }) === slug);

  if (!event) return null;

  const community = communities.find((c) => c.id === event.community_id);
  const pct = Math.min(100, (event.attendees_count / event.capacity) * 100);
  const isFull = event.attendees_count >= event.capacity;
  const spotsLeft = Math.max(0, event.capacity - event.attendees_count);

  const joined = hasJoinedEvent(event.id);
  const saved = hasSavedEvent(event.id);
  const handleJoin = () => joinEvent(event.id);
  const handleSave = () => saveEvent(event.id);
  const handleShare = () => console.log("share event", event.id);
  const handleComment = () => console.log("comment", event.id);

  const relatedEvents = events
    .filter(
      (e) =>
        e.id !== event.id &&
        (e.community_id === event.community_id ||
          e.tags.some((t) => event.tags.includes(t))),
    )
    .slice(0, 3);

  return (
    <>
      <div className="px-6 py-3 border-b border-b-[#E4E4E7]">
        <Link
          to="/events"
          className="inline-flex text-sm text-secondary hover:text-primary items-center"
        >
          <span className="mr-1.5">
            <IoMdArrowBack />
          </span>{" "}
          Back to Events
        </Link>
      </div>
      <main className="max-w-7xl lg:mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            {/* Banner Image */}
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-sm"
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {event.title}
            </h1>

            {/* Card Action & Info (Mobile-only) */}
            <div className="block lg:hidden bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between text-sm text-gray-500">
                <span>{event.attendees_count} attendees</span>
                <span>{event.capacity} capacity</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`${getProgressColor(pct)} h-full`}
                  style={{ width: `${pct}%` }}
                ></div>
              </div>
              <button
                disabled={isFull || joined}
                onClick={() => (isAttendee ? handleJoin() : setShowPrompt(true))}
                className={`w-full py-3 rounded-xl font-medium transition ${
                  isFull
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : joined
                      ? "bg-[#33B570] text-white"
                      : "bg-orange-600 text-white hover:bg-orange-700"
                }`}
              >
                {isFull ? (
                  "Full"
                ) : joined ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <IoCheckmark />
                    Registered
                  </span>
                ) : (
                  "Join Event"
                )}
              </button>
            </div>

            {/* About This Event */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                About this event
              </h2>
              {event.description.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="text-gray-600 leading-relaxed text-sm md:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Speakers */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Speakers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.speakers.map((speaker) => (
                  <div
                    key={speaker.name}
                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl"
                  >
                    <img
                      src={speaker.avatar_url}
                      className="w-12 h-12 rounded-full object-cover"
                      alt={speaker.name}
                    />
                    <div>
                      <h4 className="font-semibold text-sm">{speaker.name}</h4>
                      <p className="text-xs text-gray-500">{speaker.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Discussion Section */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="flex gap-2 items-center text-lg font-bold text-gray-900">
                <IoChatboxOutline />Discussion ({event.discussions.length})
              </h3>
              <div className="space-y-4">
                {event.discussions.map((discussion, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold shrink-0">
                      {discussion.user_name.charAt(0)}
                    </div>
                    <div className="px-4 py-3 border border-gray-200 rounded-xl">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm font-inter">
                          {discussion.user_name}
                        </h4>
                        <span className="text-xs text-secondary font-inter font-normal">
                          {discussion.time}
                        </span>
                      </div>
                      <p className="text-sm text-secondary font-inter font-normal">
                        {discussion.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Input Comment */}
              <div className="flex gap-3 items-center pt-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold shrink-0">
                  G
                </div>
                <InputField
                  placeholder="Write a comment..."
                  leading={null}
                  trailing={
                    <button
                      className="px-4"
                      onClick={() => (isAttendee ? handleComment() : setShowPrompt(true))}
                    >
                      <IoMdSend className="text-primary w-5 h-5" />
                    </button>
                  }
                />
              </div>
            </div>

            {/* You Might Also Like (Grid Related Events) */}
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                You might also like
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedEvents.map((related) => (
                  <EventCard key={related.id} events={related} />
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block space-y-6 top-8">
            {/* Card Info Event */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
              <h3 className="font-inter text-xs font-medium text-secondary uppercase">
                Event Info
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex gap-3 items-center">
                  <CiCalendar className="text-secondary shrink-0 text-base" />
                  <div>
                    <p className="font-medium text-secondary">
                      {formatEventDate(event.date)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <IoLocationOutline className="text-secondary shrink-0 text-base" />
                  <div>
                    <p className="font-medium text-secondary">
                      {event.start_time} - {event.end_time} WIB
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <RxPeople className="text-secondary shrink-0 text-base" />
                  <div>
                    <p className="font-medium text-secondary">
                      {event.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Capacity & Progress */}
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{event.attendees_count} attendees</span>
                  <span>{event.capacity} capacity</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`${getProgressColor(pct)} h-full`}
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400">
                  {Math.round(pct)}% full - {spotsLeft} spots left
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  disabled={isFull || joined}
                  onClickCapture={() => (isAttendee ? handleJoin() : setShowPrompt(true))}
                  className={`w-full py-3 rounded-xl font-medium transition shadow-sm ${
                    isFull
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : joined
                        ? "bg-[#33B570] text-white"
                        : "bg-orange-600 text-white hover:bg-orange-700"
                  }`}
                >
                  {isFull ? (
                    "Full"
                  ) : joined ? (
                    <span className="flex items-center justify-center gap-1.5">
                      <IoCheckmark />
                      Registered
                    </span>
                  ) : (
                    "Join Event"
                  )}
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClickCapture={() => (isAttendee ? handleSave() : setShowPrompt(true))}
                    className="flex gap-2 justify-center items-center font-inter py-2.5 border border-gray-200 text-secondary rounded-xl font-medium text-sm hover:bg-gray-50 transition"
                  >
                    {saved ? (
                      <GoBookmarkFill className="text-lg text-primary" />
                    ) : (
                      <CiBookmark />
                    )}
                    {saved ? "Saved" : "Save"}
                  </button>
                  <button
                    onClickCapture={() => (isAttendee ? handleShare() : setShowPrompt(true))}
                    className="flex gap-2 justify-center items-center font-inter py-2.5 border border-gray-200 text-secondary rounded-xl font-medium text-sm hover:bg-gray-50 transition"
                  >
                    <IoShareSocialOutline /> Share
                  </button>
                </div>
              </div>
            </div>

            {/* Card Organizer */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-semibold text-secondary uppercase font-inter">
                Organized by
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src={event.organizer.avatar_url}
                  className="w-10 h-10 rounded-full object-cover"
                  alt={event.organizer.name}
                />
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 font-inter">
                    {event.organizer.name}
                  </h4>
                  <p className="text-xs text-[#3363FF] font-normal font-inter">
                    {community?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {showPrompt && <AuthPromptModal onClose={() => setShowPrompt(false)} />}
    </>
  );
}

export default EventDetail;
