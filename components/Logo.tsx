import { FaCompressArrowsAlt } from "react-icons/fa";

export default function Logo() {
  return (
    <div
      className={` flex flex-row items-center leading-none text-slate-900 gap-4`}
    >
      <FaCompressArrowsAlt className="h-12 w-12 " />
      <p className="text-[20px]">The Expense Tracker</p>
    </div>
  );
}
