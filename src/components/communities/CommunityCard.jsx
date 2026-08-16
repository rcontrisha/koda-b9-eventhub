import { useState } from "react";
import { RxPeople } from "react-icons/rx";
import { CiCalendar } from "react-icons/ci";
import { useAuth } from "../../hooks/useAuth";
import AuthPromptModal from "../shared/AuthPromptModal";

function CommunityCard({ community }) {
  const { isAttendee } = useAuth();
  const [showPrompt, setShowPrompt] = useState(false);

  const handleJoin = () => console.log("join community", community.id);

  return (
    <article className="flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div>
        <img
          src={community.banner_url}
          height={176}
          alt="Community Image"
          className="w-full h-44 object-cover"
        />
      </div>
      
      <div className="flex flex-col grow p-4 justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-jakarta font-semibold text-base text-gray-900">
            {community.name}
          </p>
          <p className="font-inter font-normal text-gray-500 text-xs line-clamp-2">
            {community.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {community["tags"].map((tag, index) => {
              return (
                <div 
                  key={index} 
                  className="px-2 py-0.5 text-white bg-gray-500 rounded-full font-medium font-inter text-xs"
                >
                  {tag}
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-4 mt-auto">
          <div className="flex gap-3 pb-3">
            <div className="flex gap-1 items-center">
              <RxPeople className="text-gray-500" />
              <p className="text-gray-500 font-inter font-normal text-xs">
                {community.member_count} Members
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <CiCalendar className="text-gray-500" />
              <p className="text-gray-500 font-inter font-normal text-xs">
                {community.upcoming_events_count} Upcoming
              </p>
            </div>
          </div>

          <button
            onClick={() => (isAttendee ? handleJoin() : setShowPrompt(true))}
            className="w-full text-center bg-primary hover:opacity-95 transition-opacity rounded-lg text-white font-medium py-2 px-3 text-sm cursor-pointer"
          >
            Join Event
          </button>
        </div>
      </div>
      {showPrompt && <AuthPromptModal onClose={() => setShowPrompt(false)} />}
    </article>
  );
}

export default CommunityCard;