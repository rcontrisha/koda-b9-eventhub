import CommunityCard from "../components/communities/CommunityCard";
import SearchBar from "../components/shared/SearchBar";
import communities from "../data/communities.json";

function Communities() {
  return (
    <main>
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
            <SearchBar
              placeholder={"Search communities..."}
              showButton={false}
            />
          </div>
        </div>
      </section>
      <div className="flex gap-3 px-13 pt-6">
        <div className="flex gap-1 rounded-lg border border-[#E4E4E7] p-1 items-center">
          <div className="selected font-inter font-medium text-xs text-secondary rounded-md px-3 py-1.5 cursor-pointer">
            All
          </div>
          <div className="font-inter font-medium text-xs text-secondary rounded-md px-3 py-1.5 cursor-pointer">
            Joined
          </div>
          <div className="font-inter font-medium text-xs text-secondary rounded-md px-3 py-1.5 cursor-pointer">
            Not Joined
          </div>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <div className="selected font-inter font-medium text-xs text-secondary rounded-md px-3 py-1.5 cursor-pointer border border-[#E4E4E7]">
            All Categories
          </div>
          {[
            "Technology",
            "AI",
            "Design",
            "Business",
            "Programming",
            "Music",
          ].map((topic) => {
            return (
              <div className="font-inter font-medium text-xs text-secondary rounded-md px-3 py-1.5 cursor-pointer border border-[#E4E4E7]">
                {topic}
              </div>
            );
          })}
        </div>
      </div>
      <section className="px-4 py-6 lg:px-13">
        <p className="font-inter font-semibold text-sm text-secondary">
          {communities.length}
          <span className="font-inter font-normal text-sm text-secondary">
            {" "}
            communities found
          </span>
        </p>
        <div className="pt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
          {communities.map((community) => {
            return <CommunityCard community={community} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default Communities;
