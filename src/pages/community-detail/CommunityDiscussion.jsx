import { useState } from "react";
import { useParams } from "react-router";
import slugify from "slugify";
import { IoMdSend } from "react-icons/io";

import { useAuth } from "../../hooks/useAuth";
import AuthPromptModal from "../../components/shared/AuthPromptModal";
import InputField from "../../components/shared/InputField";
import communities from "../../data/communities.json";

function CommunityDiscussion() {
  const { slug } = useParams();
  const community = communities.find(
    (c) => slugify(c.name, { lower: true }) === slug,
  );

  const { isAttendee } = useAuth();
  const [showPrompt, setShowPrompt] = useState(false);

  const handleComment = () => console.log("comment", event.id);

  return (
    <div>
      <div className="flex gap-3 items-start pt-2">
        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold shrink-0">
          G
        </div>
        <InputField
          placeholder="Start a discussion..."
          leading={null}
          trailing={
            <button
              className="px-4 cursor-pointer"
              onClick={() =>
                isAttendee ? handleComment() : setShowPrompt(true)
              }
            >
              <IoMdSend className="text-primary w-5 h-5" />
            </button>
          }
        />
      </div>
      <div className="space-y">
        {community.discussions.map((discussion, index) => (
          <div key={index} className="flex items-start gap-3 pt-4">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold shrink-0">
              {discussion.user_name.charAt(0)}
            </div>
            <div className="px-4 py-3 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm font-inter">
                  {discussion.user_name}
                </h4>
                <span className="text-xs text-secondary font-inter font-normal">
                  {discussion.time}
                </span>
              </div>
              <p className="text-sm text-secondary font-inter font-normal">
                {discussion.message}
              </p>
            </div>
          </div>
        ))}
      </div>
      {showPrompt && <AuthPromptModal onClose={() => setShowPrompt(false)} />}
    </div>
  );
}

export default CommunityDiscussion;
