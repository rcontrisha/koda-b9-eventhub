import { RxCheck } from "react-icons/rx";

function EventSuccess({ isEditing = false }) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)] w-full">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="bg-[#33B5701A] w-16 h-16 rounded-full flex justify-center items-center">
          <RxCheck strokeWidth={1} className="w-8 h-8 text-[#33B570]" />
        </div>
        <p className="pt-4 font-jakarta font-bold text-2xl text-[#18181B] leading-8">
          Event {isEditing ? "Updated" : "Created"}!
        </p>
        <div className="flex gap-2 justify-center items-center pt-2">
          <div className="w-6 h-6 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          <p className="font-inter font-normal text-sm text-secondary leading-5">
            Redirecting to your dashboard...
          </p>
        </div>
      </div>
    </div>
  );
}

export default EventSuccess;
