import { useEffect, useRef } from "react";

export function useAttendeeStream(idsKey, onUpdate) {
  const onUpdateRef = useRef(onUpdate);

  useEffect(() => {
    onUpdateRef.current = onUpdate;
  });

  useEffect(() => {
    if (!idsKey) return;
    
    const es = new EventSource(
      `${import.meta.env.VITE_API_URL}/events/stream?ids=${idsKey}`,
    );

    es.addEventListener("attendee_count", (e) => {
      const { event_id, count } = JSON.parse(e.data);
      onUpdateRef.current?.({ eventId: event_id, count });
    });
    
    return () => es.close();
  }, [idsKey]);
}