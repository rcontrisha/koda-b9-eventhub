import EventCard from "../events/EventCard";
import { useAuth } from "../../hooks/useAuth";

function PastEvents() {
  const { user } = useAuth();
  const now = new Date();
  const past = user.joined_events.filter(
    (e) => new Date(e.end_time) < now,
  );

  if (past.length === 0) {
    return (
      <p className="pt-5 text-secondary font-inter text-sm">
        No past events.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
      {past.map((e) => (
        <EventCard key={e.id} events={e} />
      ))}
    </div>
  );
}

export default PastEvents;
