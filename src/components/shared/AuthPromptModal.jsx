import { Link } from "react-router";
import { RxCross2 } from "react-icons/rx";

function AuthPromptModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 transition-all"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-neutral-900 border border-[#E4E4E7] dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-[#E4E4E7] dark:border-neutral-800 p-6">
          <h3 className="font-jakarta font-bold text-lg text-neutral-900 dark:text-neutral-100">
            Sign in to continue
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-secondary dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <RxCross2 className="w-5 h-5 cursor-pointer" />
          </button>
        </div>

        <div className="px-6 py-8 flex flex-col justify-center items-center text-center">
          <div className="bg-[#FF5F221A] border border-[#FF5F2233] w-14 h-14 rounded-2xl text-3xl flex justify-center items-center shadow-xs">
            🎟️
          </div>
          <p className="font-inter font-normal text-sm text-secondary dark:text-neutral-400 pt-5 leading-relaxed max-w-xs">
            Create a free account to register for events, save favourites, join
            communities, and get personalised recommendations.
          </p>
        </div>

        <div className="flex gap-3 p-6 pt-2 border-t border-[#E4E4E7] dark:border-neutral-800 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 border border-[#E4E4E7] dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-secondary dark:text-neutral-300 rounded-lg font-inter text-sm cursor-pointer transition-colors"
          >
            Keep Browsing
          </button>
          <Link
            to="/login"
            onClick={onClose}
            className="w-fit text-center bg-primary hover:bg-orange-600 text-white py-2 px-5 rounded-lg font-inter text-sm font-medium transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthPromptModal;