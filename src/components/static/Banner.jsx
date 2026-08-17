import { Link } from "react-router";

function Banner() {
  return (
    <div className="p-8 bg-black rounded-2xl">
      <div className="flex gap-2 justify-center items-center">
        <div className="bg-[#3363FF1A] px-2 py-0.5 rounded-full text-[#3363FF] text-xs font-normal font-inter w-fit">
          Technology
        </div>
        <div className="bg-[#3363FF1A] px-2 py-0.5 rounded-full text-[#3363FF] text-xs font-normal font-inter w-fit">
          AI
        </div>
        <div className="bg-[#F3E8FF] px-2 py-0.5 rounded-full text-[#9810FA] text-xs font-normal font-inter w-fit">
          Design
        </div>
      </div>
      <p className="pt-4 font-jakarta font-bold text-white text-2xl text-center">Ready to find your community?</p>
      <p className="pt-3 font-inter font-normal text-secondary text-sm text-center">Join thousands of developers, designers, and makers in Indonesia's most active tech communities.</p>
      <div className="pt-6 flex flex-col lg:flex-row gap-3 justify-center items-center">
        <Link to={"/events"} className="bg-primary px-6 py-3 rounded-lg text-white font-inter font-medium text-base w-fit">Explore Events</Link>
        <Link to={"/communities"} className="border-2 border-[#3F3F47] px-6 py-3 rounded-lg text-secondary font-inter font-medium text-base w-fit">Browse Communities</Link>
      </div>
    </div>
  );
}

export default Banner;
