import { useParams } from "react-router";
// import slugify from "slugify";

import EventCard from "../../components/events/EventCard";
import { useEffect, useState } from "react";

function CommunityEvents() {
  const { id } = useParams();
  // const { communities } = useSelector((state) => state.communitiesState);
  const [communityEvents, setCommunityEvents] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:8080/communities/${id}/upcoming-events`);
        const data = await response.json();
        console.log(data);
        setCommunityEvents(data.data.events);
        return data;
      } catch (error) {
        console.log(error);
        return "Failed to fetch event's detail.";
      }
    })();
  }, [id]);

  // const community = communities.find(
  //   (c) => slugify(c.name, { lower: true }) === slug,
  // );
  // const communityEvents = events.filter(
  //   (e) => e.community_id === community?.id,
  // );

  return (
    <>
      <p className="font-inter font-semibold text-sm text-secondary">
        UPCOMING
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-4">
        {communityEvents?.map((event) => {
          return <EventCard key={event.id} events={event} />;
        })}
      </div>
    </>
  );
}

export default CommunityEvents;
