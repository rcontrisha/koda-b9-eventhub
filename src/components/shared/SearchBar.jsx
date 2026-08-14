import { FiSearch } from "react-icons/fi";

function SearchBar({ placeholder, showButton }) {
  return (
    <div className="flex items-center rounded-xl p-1.5 bg-[#F4F4F5] grow">
      <FiSearch className="text-secondary text-lg ml-3" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-3 py-2 focus:outline-0 font-inter"
      />
      <button className={"bg-primary text-white font-inter font-medium text-sm px-6 py-2.5 rounded-lg " + (!showButton && "hidden")}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
