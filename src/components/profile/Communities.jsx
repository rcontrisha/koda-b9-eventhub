import { useAuth } from "../../hooks/useAuth";
import CommunityCard from "../communities/CommunityCard";

function Communities() {
  const { user } = useAuth();
  const joined_communities = user?.joined_communities
  
  if (joined_communities.length === 0) {
    return (
      <p className="pt-5 text-secondary font-inter text-sm">
        You have not joined any community yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
      {joined_communities.map((community) => {
        return <CommunityCard key={community.id} community={community} />
      })}
    </div>
  );
}

export default Communities;
