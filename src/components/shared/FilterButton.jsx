import { BsSliders } from "react-icons/bs";

function FilterButton({ isOpen, clicked }) {
  return (
    <div
      onClickCapture={() => clicked(!isOpen)}
      className={`${isOpen ? "border border-primary text-primary" : "border border-[#E4E4E7] text-secondary "} px-3 py-2.5 rounded-xl text-sm font-medium font-inter flex flex-nowrap items-center gap-1.5 cursor-pointer`}
    >
      <span>
        <BsSliders width={16} height={16} />
      </span>
      <span className="hidden lg:flex">Filters</span>
    </div>
  );
}

export default FilterButton;
