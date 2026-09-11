import InputField from "../components/shared/InputField";

function HeroSection() {
  return (
    <section className="bg-black dark:bg-neutral-900 text-white w-full border-b border-[#27272a]/50">
      <div className="max-w-4xl mx-auto text-center py-12 md:py-16 px-4 sm:px-6">
        {/* Badge Pill */}
        <div className="px-3 py-1.5 mb-6 bg-[#FF5F221A] border border-[#FF5F2233] w-fit mx-auto text-primary font-medium text-xs font-inter rounded-full">
          Discover · Connect · Participate
        </div>

        {/* Heading Title */}
        <h1 className="font-jakarta font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
          Find events that <span className="text-primary">actually matter</span>{" "}
          to you
        </h1>

        {/* Subtitle / Description */}
        <p className="font-inter text-[#A1A1AA] font-normal text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
          Join workshops, conferences, and meetups in Indonesia&apos;s best tech
          communities — or create your own.
        </p>

        {/* Search Bar Container */}
        <div className="pt-8 max-w-2xl mx-auto">
          <InputField
            placeholder="Search events, topics, or locations"
            className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500 focus:border-primary"
            trailing={
              <button
                type="button"
                className="bg-primary hover:bg-orange-600 text-white font-inter font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Search
              </button>
            }
          />
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center gap-2.5 justify-center pt-6">
          {[
            "Technology",
            "AI",
            "Design",
            "Business",
            "Programming",
            "Music",
          ].map((topic, idx) => (
            <button
              key={idx}
              type="button"
              className="px-3.5 py-1.5 border border-[#3F3F47] hover:border-neutral-400 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-300 hover:text-white font-inter text-xs sm:text-sm rounded-full transition-all cursor-pointer"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;