import { useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { useAuth } from "../hooks/useAuth";
import CommunityCard from "../components/communities/CommunityCard";
import InputField from "../components/shared/InputField";
import { getCommunities } from "../redux/slices/CommunitySlice";

function Communities() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, hasJoinedCommunity } = useAuth();
  const dispatch = useDispatch();
  const { communities, isPending, isRejected } = useSelector(
    (state) => state.communitiesState,
  );

  const url = "http://localhost:8080/communities"

  useEffect(() => {
    dispatch(getCommunities(url));
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
    <main className="flex flex-col min-h-[calc(100vh-200px)] bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
      {isPending && (
        <div className="flex items-center justify-center grow">
          <div className="w-14 h-14 border-4 border-neutral-200 dark:border-neutral-800 border-t-primary dark:border-t-primary rounded-full animate-spin"></div>
        </div>
      )}

      {!isPending && !isRejected && (
        <>
          {/* Hero Section */}
          <section className="bg-black text-white w-full border-b border-[#27272a]/50 py-12 md:py-16 px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-jakarta font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
                Explore Communities
              </h2>
              <p className="font-inter text-neutral-400 font-normal text-base md:text-lg pt-3 max-w-xl mx-auto leading-relaxed">
                Join communities that match your interests and get personalized
                event recommendations.
              </p>
              <div className="pt-6 max-w-xl mx-auto">
                <InputField
                  placeholder="Search communities..."
                  value={query}
                  onChange={(c) => handleFilter("q", c.target.value)}
                  className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500 focus:border-primary"
                />
              </div>
            </div>
          </section>

          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-3 px-4 lg:px-12 pt-6 items-start lg:items-center">
            {/* Status Tabs */}
            <div className="flex gap-1 rounded-lg border border-[#E4E4E7] dark:border-neutral-800 bg-white dark:bg-neutral-900 p-1 items-center shadow-xs">
              {["All", "Joined", "Not Joined"].map((s) => {
                const isActive =
                  status === s || (s === "All" && !searchParams.get("status"));
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleFilter("status", s)}
                    className={`${
                      isActive
                        ? "selected shadow-xs"
                        : "text-secondary dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    } font-inter font-medium text-xs rounded-md px-3 py-1.5 transition-all cursor-pointer`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            {/* Category Chips */}
            <div className="flex items-center gap-2 flex-wrap">
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
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleFilter("cat", cat)}
                    className={`${
                      isActive
                        ? "selected shadow-xs"
                        : "bg-white dark:bg-neutral-900/60 border border-[#E4E4E7] dark:border-neutral-800 text-secondary dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-700 hover:text-neutral-900 dark:hover:text-white"
                    } font-inter font-medium text-xs rounded-md px-3 py-1.5 transition-all cursor-pointer`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Section */}
          <section className="px-4 py-6 lg:px-12">
            <p className="font-inter font-semibold text-sm text-neutral-700 dark:text-neutral-300">
              {filteredCommunities.length}{" "}
              <span className="font-normal text-secondary dark:text-neutral-400">
                communities found
              </span>
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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