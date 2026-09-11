import { useSelector } from "react-redux";

function AdminCommunities() {
  const { communities } = useSelector((state) => state.communitiesState);

  return (
    <>
      {communities.map((community) => {
        return (
          <div
            key={community.id}
            className="px-4 py-4 flex gap-4 items-center border border-[#E4E4E7] dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl mb-3 transition-colors"
          >
            <img
              src={community.banner_url}
              alt={community.name}
              className="w-12 h-10 rounded-lg object-cover shrink-0"
            />
            <div className="grow min-w-0">
              <p className="font-inter font-medium text-sm text-[#18181B] dark:text-neutral-100 leading-5 truncate">
                {community.name}
              </p>
              <p className="font-inter font-normal text-xs text-secondary dark:text-neutral-400 leading-4 truncate">
                {community.member_count} members ·{" "}
                {community.upcoming_events_count} upcoming events
              </p>
            </div>
            <div className="flex gap-2 items-center shrink-0">
              <div
                className={`${
                  community.status === "inactive"
                    ? "bg-[#F4F4F5] dark:bg-neutral-800 text-[#52525C] dark:text-neutral-400"
                    : "bg-[#33B5701A] text-[#33B570]"
                } font-inter font-medium text-xs leading-4 px-2 py-0.5 rounded-full capitalize`}
              >
                {community.status || "Active"}
              </div>
              <button
                type="button"
                className="text-[#9F9FA9] dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 text-xl font-bold flex items-center cursor-pointer transition-colors px-1"
              >
                ...
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default AdminCommunities;