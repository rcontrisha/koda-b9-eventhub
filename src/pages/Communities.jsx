import { useSearchParams } from "react-router";

import { useAuth } from "../hooks/useAuth";
import CommunityCard from "../components/communities/CommunityCard";
import InputField from "../components/shared/InputField";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCommunities } from "../redux/slices/CommunitySlice";

function Communities() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, hasJoinedCommunity } = useAuth();
  const dispatch = useDispatch();
  const { communities, isPending, isRejected } = useSelector(
    (state) => state.communitiesState,
  );

  useEffect(() => {
    dispatch(getCommunities());
  }, [dispatch]);

  const query = searchParams.get("q") || "";
  const status = searchParams.get("status") || "All";
  const category = searchParams.get("cat") || "All Categories";

  const filteredCommunities = communities.filter((c) => {
    const matchName = c.name.toLowerCase().includes(query.toLowerCase());

    const matchCat = category === "All Categories" || c.tags.includes(category);

    const isJoined = user ? hasJoinedCommunity(c.id) : false;
    const matchStatus =
      status === "All" ? true : status === "Joined" ? isJoined : !isJoined;

    return matchName && matchCat && matchStatus;
  });

  const handleFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "All" || value === "All Categories") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  return (
    <main className="flex flex-col min-h-[calc(100vh-200px)]">
      {isPending && (
        <div className="flex items-center justify-center grow">
          <div className="w-16 h-16 border-10 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      )}
      {!isPending && !isRejected && (
        <>
          <section className="bg-black lg:px-[347.5px]">
            <div className="w-full mx-auto text-center py-10 px-4">
              <h2 className="font-jakarta font-extrabold text-4xl md:text-6xl text-white">
                Explore Communities
              </h2>
              <p className="font-inter text-secondary font-normal text-lg pt-2">
                Join communities that match your interests and get personalized
                event recommendations.
              </p>
              <div className="pt-6">
                <InputField
                  placeholder={"Search communities..."}
                  value={query}
                  onChange={(c) => handleFilter("q", c.target.value)}
                />
              </div>
            </div>
          </section>
          <div className="flex flex-col lg:flex-row gap-3 px-4 lg:px-13 pt-6">
            <div className="flex gap-1 rounded-lg border border-[#E4E4E7] p-1 items-center">
              {["All", "Joined", "Not Joined"].map((s) => {
                const isActive =
                  status === s || (s === "All" && !searchParams.get("status"));
                return (
                  <div
                    key={s}
                    onClick={() => handleFilter("status", s)}
                    className={`${isActive ? "selected" : ""} font-inter font-medium text-xs text-secondary rounded-md px-3 py-1.5 cursor-pointer`}
                  >
                    {s}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-2 lg:justify-center justify-start flex-wrap">
              <div className="flex items-center gap-2 lg:justify-center justify-start flex-wrap">
                {[
                  "All Categories",
                  "Technology",
                  "AI",
                  "Design",
                  "Business",
                  "Programming",
                  "Music",
                ].map((cat) => {
                  const isActive = category === cat;
                  return (
                    <div
                      key={cat}
                      onClick={() => handleFilter("cat", cat)}
                      className={`${isActive ? "selected" : ""} font-inter font-medium text-xs text-secondary rounded-md px-3 py-1.5 cursor-pointer border border-[#E4E4E7]`}
                    >
                      {cat}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <section className="px-4 py-6 lg:px-13">
            <p className="font-inter font-semibold text-sm text-secondary">
              {filteredCommunities.length}
              <span className="font-inter font-normal text-sm text-secondary">
                {" "}
                communities found
              </span>
            </p>
            <div className="pt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
              {filteredCommunities.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default Communities;
