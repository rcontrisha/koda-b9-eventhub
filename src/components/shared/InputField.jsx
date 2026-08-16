import { FiSearch } from "react-icons/fi";

function InputField({ placeholder, leading, trailing }) {
  return (
    <div className="flex items-center rounded-xl p-1.5 bg-[#F4F4F5] grow">
      {leading === undefined ? (
        <FiSearch className="text-secondary text-lg ml-3" />
      ) : (
        leading
      )}
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-3 py-1 focus:outline-0 font-inter bg-transparent"
      />
      {trailing}
    </div>
  );
}

export default InputField;
