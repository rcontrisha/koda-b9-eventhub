import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { attendeeCountUpdated } from "../redux/slices/EventSlice";

export function useAttendeeStream(idsKey) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!idsKey) return;
    // TODO 1: const es = new EventSource(`${BASE_URL}/events/stream?ids=${idsKey}`);
    const es = new EventSource(
      `${import.meta.env.VITE_API_URL}/events/stream?ids=${idsKey}`,
    );
    // TODO 2: es.addEventListener("attendee_count", (e) => {
    //           const { event_id, count } = JSON.parse(e.data);
    //           dispatch(attendeeCountUpdated({ eventId: event_id, count }));
    //         });
    es.addEventListener("attendee_count", (e) => {
      const { event_id, count } = JSON.parse(e.data);
      dispatch(attendeeCountUpdated({ eventId: event_id, count }));
    });
    // TODO 3: return () => es.close();
    return () => es.close();
  }, [idsKey, dispatch]);
}
