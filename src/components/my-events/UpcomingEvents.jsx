import EventCard from "../events/EventCard";
import { useAuth } from "../../hooks/useAuth";

function UpcomingEvents() {
  const { user } = useAuth();
  const now = new Date();
  const upcoming = user.joined_events.filter(
    (e) => new Date(e.start_time) >= now,
  );

  if (upcoming.length === 0) {
    return (
      <p className="pt-5 text-secondary font-inter text-sm">
        No upcoming events.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
      {upcoming.map((e) => (
        <EventCard key={e.id} events={e} />
      ))}
    </div>
  );
}

export default UpcomingEvents;
