import UpcomingEvents from "../my-events/UpcomingEvents";
import PastEvents from "../my-events/PastEvents";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myEvents } from "../../redux/slices/LoginSlice";

function Events() {
  const { joined_events: events } = useSelector(
    (state) => state.activeState.active.user,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myEvents());
  }, [dispatch]);

  if (events) {
    console.log(events);
  }

  return (
    <>
      <div>
        <p className="font-inter font-semibold text-sm text-secondary">
          UPCOMING
        </p>
        <div>
          <UpcomingEvents />
        </div>
      </div>
      <div className="pt-6">
        <p className="font-inter font-semibold text-sm text-secondary">PAST</p>
        <div>
          <PastEvents />
        </div>
      </div>
    </>
  );
}

export default Events;
