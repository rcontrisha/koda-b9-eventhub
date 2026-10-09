import { useEffect, useState } from "react";
import { useParams } from "react-router";

function CommunityMember() {
  const { id } = useParams();
  // const { communities } = useSelector((state) => state.communitiesState);
  const [communityMembers, setCommunityMembers] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:8080/communities/${id}/members`);
        const data = await response.json();
        console.log(data);
        setCommunityMembers(data.data.members);
        return data;
      } catch (error) {
        console.log(error);
        return "Failed to fetch community's member.";
      }
    })();
  }, [id]);

  const visibleMembers = communityMembers?.slice(0, 6);
  const remaining = communityMembers?.length - visibleMembers?.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      {visibleMembers?.map((member) => {
        return (
          <div className="flex gap-3 p-4 border border-[#E4E4E7] items-center rounded-xl">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold shrink-0">
              {member?.name.charAt(0)}
            </div>
            <div>
              <p className="font-inter font-semibold text-sm">{member?.name}</p>
              <p className="font-inter font-normal text-xs text-secondary">
                {member?.role}
              </p>
            </div>
          </div>
        );
      })}

      {remaining > 0 && (
        <div className="flex items-center justify-center p-4 border border-[#E4E4E7] rounded-xl bg-neutral-50 text-neutral-400 font-inter font-medium text-sm">
          +{remaining} More Members
        </div>
      )}
    </div>
  );
}

export default CommunityMember;
