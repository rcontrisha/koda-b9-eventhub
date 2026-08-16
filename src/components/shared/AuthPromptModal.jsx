import { Link } from "react-router";
import { RxCross2 } from "react-icons/rx";

function AuthPromptModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="flex justify-between items-center border-b border-b-[#E4E4E7] p-6">
          <h3 className="font-jakarta font-bold text-lg">
            Sign in to continue
          </h3>
          <RxCross2 className="w-4.5 h-4.5 text-secondary cursor-pointer" onClick={onClose} />
        </div>
        <div className="px-6 py-8 flex flex-col justify-center items-center">
          <div className="bg-[#FF5F221A] w-14 h-14 rounded-2xl text-3xl flex justify-center items-center">
            🎟️
          </div>
          <p className="font-inter font-normal text-sm text-secondary pt-4">
            Create a free account to register for events, save favourites, join
            communities, and get personalised recommendations.
          </p>
        </div>
        <div className="flex gap-3 p-6 pt-0 justify-end">
          <button
            onClick={onClose}
            className="w-fit py-2 px-4 border border-[#E4E4E7] text-secondary rounded-lg font-inter text-sm cursor-pointer"
          >
            Keep Browsing
          </button>
          <Link
            to="/login"
            onClick={onClose}
            className="w-fit text-center bg-primary text-white py-2 px-4 rounded-lg font-inter text-sm"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthPromptModal;
