import InputField from "../components/shared/InputField";

function HeroSection() {
  return (
    <section className="bg-black lg:px-[347.5px]">
      <div className="w-full mx-auto text-center py-10 px-4">
        <div className="px-3 py-2 mb-5 bg-[#FF5F221A] border-[#FF5F2233] w-fit mx-auto text-primary font-medium text-xs font-inter rounded-full">
          Discover · Connect · Participate
        </div>
        <h2 className="font-jakarta font-extrabold text-4xl md:text-6xl text-white mb-11">
          Find events that <span className="text-primary">actually matter</span>{" "}
          to you
        </h2>
        <p className="font-inter text-secondary font-normal text-lg mt-4 pt-4 lg:mx-10">
          Join workshops, conferences, and meetups in Indonesia's best tech
          communities — or create your own.
        </p>
        <InputField
          placeholder={"Search events, topics, or locations"}
          trailing={
            <button className="bg-primary text-white font-inter font-medium text-sm px-6 py-2.5 rounded-lg">
              Search
            </button>
          }
        />
        <div className="flex flex-wrap items-center gap-2 justify-center pt-5">
          {["Technology", "AI", "Design", "Business", "Programming", "Music"].map((topic) => {
            return (
              <div className="px-3 py-1 border-2 border-[#3F3F47] w-fit text-secondary rounded-full">{topic}</div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
