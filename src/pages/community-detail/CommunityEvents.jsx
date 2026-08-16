import { useParams } from "react-router";
import slugify from 'slugify'

import EventCard from "../../components/events/EventCard";

import communities from '../../data/communities.json'
import events from '../../data/events.json'

function CommunityEvents() {
  const { slug } = useParams();
  const community = communities.find(
    (c) => slugify(c.name, { lower: true }) === slug
  );
  const communityEvents = events.filter(
    (e) => e.community_id === community?.id
  );

  return (
    <>
      <p className="font-inter font-semibold text-sm text-secondary">
        UPCOMING
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-4">
        {communityEvents.map((event) => {
          return <EventCard events={event} />
        })}
      </div>
    </>
  );
}

export default CommunityEvents;
