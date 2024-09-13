import { ReactNode } from "react";
import { FaPlus } from "react-icons/fa";
import { FaD, FaDollarSign } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";

type TransactionProps = {
  icon1: ReactNode;
  icon2: ReactNode;
  title: string;
  date: string;
  amount: number;
};

export default function SingleTransaction({
  icon1,
  icon2,
  title,
  date,
  amount,
}: TransactionProps) {
  return (
    <div className="w-full flex items-center justify-between border-b-2 pb-1">
      <div className="flex  items-center gap-2">
        <div className="size-10 flex items-center justify-center bg-gray-300 rounded-full">
          {icon1}
        </div>
        <div className="flex flex-col space-y-1 ">
          <p className="text-sm">{title}</p>

          <div className="flex gap-4 items-center text-[12px]">
            <span>{date}</span>
            <span className="text-gray-400">4 days ago</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        {icon2}
        <span>{amount}.00</span>
      </div>
    </div>
  );
}
