import { useSelector } from "react-redux";

function AdminCommunities() {
  const { communities } = useSelector((state) => state.communitiesState);

  return (
    <>
      {communities.map((community) => {
        return (
          <div className="px-4 py-4 flex gap-4 items-center border border-[#E4E4E7] rounded-xl mb-3">
            <img src={community.banner_url} className="w-12 h-10 rounded-lg" />
            <div className="grow">
              <p className="font-inter font-medium text-sm text-[#18181B] leading-5">
                {community.name}
              </p>
              <p className="font-inter font-normal text-xs text-secondary leading-4">
                {community.member_count} members ·{" "}
                {community.upcoming_events_count} upcoming events
              </p>
            </div>
            <div className="flex gap-2 items-center ">
              <div
                className={`${community.status === "inactive" ? "bg-[#F4F4F5] text-[#52525C]" : "bg-[#33B5701A] text-[#33B570]"} font-inter font-medium text-xs leading-4 px-2 py-0.5 rounded-full`}
              >
                {community.status || "Active"}
              </div>
              <button className="text-[#9F9FA9] text-2xl flex items-center cursor-pointer h-fit">
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
