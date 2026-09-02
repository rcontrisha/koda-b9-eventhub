import { FiSearch } from "react-icons/fi";

function InputField({ placeholder, leading, trailing, value, onChange }) {
  return (
    <div className="flex items-center rounded-xl p-1.5 border border-[#E4E4E7] grow">
      {leading === undefined ? (
        <FiSearch className="text-secondary text-lg ml-3" />
      ) : (
        leading
      )}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-1 focus:outline-0 font-inter bg-transparent"
      />
      {trailing}
    </div>
  );
}

export default InputField;
