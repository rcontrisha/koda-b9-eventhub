import { RxPeople } from "react-icons/rx";
import { CiCalendar } from "react-icons/ci";

function CommunityCard({ community }) {
  return (
    <article>
      <div>
        <img
          src={community.banner_url}
          height={176}
          alt="Community Image"
          className="rounded-t-xl w-full"
        />
      </div>
      <div className="grid grid-rows-3 p-4 auto-rows-min">
        <p className="font-jakarta font-semibold text-base h-fit items-start">
          {community.name}
        </p>
        <p className="font-inter font-normal text-secondary text-xs">
          {community.description}
        </p>
        <div className="flex gap-2 items-center">
          {community["tags"].map((tag) => {
            return (
              <div className="px-2 py-0.5 text-white bg-gray-500 rounded-full font-medium font-inter text-xs">
                {tag}
              </div>
            );
          })}
        </div>
        <div className="flex gap-3">
          <div className="flex gap-1 items-center pt-1.5">
            <RxPeople />
            <p className="text-secondary font-inter font-normal text-xs">
              {community.member_count} Members
            </p>
          </div>
          <div className="flex gap-1 items-center pt-1.5">
            <CiCalendar />
            <p className="text-secondary font-inter font-normal text-xs">
              {community.upcoming_events_count} Upcoming
            </p>
          </div>
        </div>
        <div className="w-full mt-1 text-center bg-primary rounded-lg text-white py-1.5 px-3">
          Join Event
        </div>
      </div>
    </article>
  );
}

export default CommunityCard;
