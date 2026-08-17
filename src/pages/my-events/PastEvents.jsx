import EventCard from "../../components/events/EventCard";
import { useAuth } from "../../hooks/useAuth";
import events from "../../data/events.json";

function PastEvents() {
  const { user } = useAuth();
  const now = new Date();
  const past = events.filter(
    (e) => user?.joined_events?.includes(e.id) && new Date(e.date) < now,
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
