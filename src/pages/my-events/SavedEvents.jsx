import EventCard from "../../components/events/EventCard";
import { useAuth } from "../../hooks/useAuth";
import events from "../../data/events.json";

function SavedEvents() {
  const { user } = useAuth();
  const saved = events.filter((e) => user?.saved_events?.includes(e.id));

  if (saved.length === 0) {
    return (
      <p className="pt-5 text-secondary font-inter text-sm">
        No saved events.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
      {saved.map((e) => (
        <EventCard key={e.id} events={e} />
      ))}
    </div>
  );
}

export default SavedEvents;
