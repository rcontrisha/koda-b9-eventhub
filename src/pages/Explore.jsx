import { Link } from "react-router";
import { FaArrowTrendUp } from "react-icons/fa6";
import slugify from "slugify";

import HeroSection from "../components/HeroSection";
import EventCard from "../components/events/EventCard";
import CommunityCard from "../components/communities/CommunityCard";
import TestiCard from "../components/static/TestiCard";

import events from "../data/events.json";
import communities from "../data/communities.json";
import Banner from "../components/static/Banner";
import { useAuth } from "../hooks/useAuth";

function Explore() {
  const { user, isAttendee } = useAuth();
  
  const joined_communities = communities.filter((c) =>
    user?.joined_communities?.includes(c.id),
  );

  const recommendedEvent = events.filter(
    (e) => e.community_id === joined_communities[0]?.id,
  );

  return (
    <>
      <HeroSection />
      {/* Recommendation Section */}
      {isAttendee && joined_communities.length > 0 && (
        <div className="px-4 py-8 lg:py-10 lg:px-13">
          <div className="flex gap-2 text-primary font-inter font-medium text-xs items-center">
            <FaArrowTrendUp width={16} height={16} />
            RECOMMENDED FOR YOU
          </div>
          <div className="flex justify-between items-center">
            <h2 className="font-jakarta font-bold text-xl">
              Because you joined{" "}
              <span className="text-primary">{joined_communities[0].name}</span>
            </h2>
            <Link
              to={`/communities/${slugify(joined_communities[0].name.toLowerCase())}`}
              className="font-inter text-sm font-normal text-secondary"
            >
              See all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
            {recommendedEvent.slice(0, 3).map((event) => {
              return <EventCard key={event.id} events={event} />;
            })}
          </div>
        </div>
      )}
      {/* Events Section */}
      <div className="px-4 py-8 lg:py-10 lg:px-13">
        <div className="flex justify-between items-center">
          <h2 className="font-jakarta font-bold text-xl">
            Discover events that interest you
          </h2>
          <Link
            to={"/events"}
            className="font-inter text-sm font-normal text-secondary"
          >
            See all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
          {events.slice(0, 6).map((event) => {
            return <EventCard key={event.id} events={event} />;
          })}
        </div>
      </div>
      {/* Communities Section */}
      <div className="px-4 py-8 lg:py-10 lg:px-13">
        <div className="flex justify-between items-center">
          <h2 className="font-jakarta font-bold text-xl">
            Popular Communities
          </h2>
          <Link
            to={"/communities"}
            className="font-inter text-sm font-normal text-secondary"
          >
            See all
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 pt-5">
          {communities.slice(0, 4).map((community) => {
            return <CommunityCard key={community.id} community={community} />;
          })}
        </div>
      </div>
      {/* Testimonials */}
      <div className="px-4 py-8 lg:py-10 lg:px-14">
        <h2 className="font-jakarta font-bold text-xl">
          What the Community Says
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-5">
          <TestiCard />
          {/* {communities.map((community) => {
            return <CommunityCard community={community} />;
          })} */}
        </div>
      </div>
      {/* Banner bottom */}
      <div className="px-4 py-8 lg:py-10 lg:px-14">
        <Banner />
      </div>
    </>
  );
}

export default Explore;
