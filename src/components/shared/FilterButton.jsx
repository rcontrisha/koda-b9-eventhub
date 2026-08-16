import { BsSliders } from "react-icons/bs";

function FilterButton() {
  return (
    <div className="px-3 py-2.5 border border-[#E4E4E7] rounded-xl text-secondary text-sm font-medium font-inter flex flex-nowrap items-center gap-1.5 cursor-pointer">
      <span>
        <BsSliders width={16} height={16} />
      </span>
      Filters
    </div>
  );
}

export default FilterButton;
