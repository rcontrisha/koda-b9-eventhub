import { Link } from "react-router";

function Banner() {
  return (
    <div className="p-8 bg-neutral-950 dark:bg-neutral-900 border border-transparent dark:border-neutral-800 rounded-2xl transition-colors duration-200">
      <div className="flex gap-2 justify-center items-center flex-wrap">
        <div className="bg-[#3363FF1A] dark:bg-[#3363FF2E] px-2.5 py-0.5 rounded-full text-[#3363FF] dark:text-[#6085FF] text-xs font-normal font-inter w-fit">
          Technology
        </div>
        <div className="bg-[#3363FF1A] dark:bg-[#3363FF2E] px-2.5 py-0.5 rounded-full text-[#3363FF] dark:text-[#6085FF] text-xs font-normal font-inter w-fit">
          AI
        </div>
        <div className="bg-[#F3E8FF] dark:bg-[#9810FA26] px-2.5 py-0.5 rounded-full text-[#9810FA] dark:text-[#C084FC] text-xs font-normal font-inter w-fit">
          Design
        </div>
      </div>

      <p className="pt-4 font-jakarta font-bold text-white text-2xl text-center">
        Ready to find your community?
      </p>

      <p className="pt-3 font-inter font-normal text-neutral-400 dark:text-neutral-400 text-sm text-center max-w-xl mx-auto">
        Join thousands of developers, designers, and makers in Indonesia's most active tech communities.
      </p>

      <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Link
          to={"/events"}
          className="bg-primary hover:bg-orange-600 px-6 py-3 rounded-lg text-white font-inter font-medium text-sm transition-colors w-full sm:w-fit text-center"
        >
          Explore Events
        </Link>
        <Link
          to={"/communities"}
          className="border border-[#3F3F47] dark:border-neutral-700 hover:bg-neutral-900 dark:hover:bg-neutral-800 px-6 py-3 rounded-lg text-neutral-300 dark:text-neutral-200 font-inter font-medium text-sm transition-colors w-full sm:w-fit text-center"
        >
          Browse Communities
        </Link>
      </div>
    </div>
  );
}

export default Banner;