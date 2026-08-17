import { useAuth } from "../../hooks/useAuth";
import CommunityCard from "../communities/CommunityCard";
import communities from '../../data/communities.json'

function Communities() {
  const { user } = useAuth();
  const joined_communities = communities.filter((c) =>
    user?.joined_communities?.includes(c.id),
  );
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
      {joined_communities.map((community) => {
        return <CommunityCard key={community.id} community={community} />
      })}
    </div>
  );
}

export default Communities;
