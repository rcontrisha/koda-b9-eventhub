import { Link } from "react-router";
import HeroSection from "../components/HeroSection";
import EventCard from "../components/events/EventCard";
import CommunityCard from "../components/communities/CommunityCard";
import TestiCard from "../components/static/TestiCard";

import events from "../data/events.json";
import communities from "../data/communities.json";
import Banner from "../components/static/Banner";

function Explore() {
  return (
    <>
      <HeroSection />
      {/* Events Section */}
      <div className="px-4 py-8 lg:py-10 lg:px-13">
        <div className="flex justify-between items-center">
          <h2 className="font-jakarta font-bold text-xl">
            Discover events that interest you
          </h2>
          <Link className="font-inter text-sm font-normal text-secondary">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
          {events.map((event) => {
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
          <Link className="font-inter text-sm font-normal text-secondary">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 pt-5">
          {communities.map((community) => {
            return <CommunityCard key={community.id} community={community} />;
          })}
        </div>
      </div>
      {/* Testimonials */}
      <div className="px-4 py-8 lg:py-10 lg:px-14">
        <h2 className="font-jakarta font-bold text-xl">What the Community Says</h2>
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
