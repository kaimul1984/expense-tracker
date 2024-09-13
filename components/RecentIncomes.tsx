import Link from "next/link";
import React from "react";

const items = [
  {
    icon1: <FaMoneyCheckDollar size={20} />,
    icon2: <FaPlus size={10} color="#60a5fa" />,
    title: "Salary wilson",
    date: "Mon 02 Sep",
    amount: 2489.0,
  },
  {
    icon1: <FaMoneyCheckDollar size={20} />,
    icon2: <FaPlus size={10} color="#60a5fa" />,
    title: "Salary wilson",
    date: "Mon 18 Sep",
    amount: 2489.0,
  },
  {
    icon1: <FaMoneyCheckDollar size={20} />,
    icon2: <FaPlus size={10} color="#60a5fa" />,
    title: "Salary wilson",
    date: "Mon 01 Oct",
    amount: 2489.0,
  },
  {
    icon1: <FaMoneyCheckDollar size={20} />,
    icon2: <FaPlus size={10} color="#60a5fa" />,
    title: "Salary wilson",
    date: "Mon 17 Oct",
    amount: 2489.0,
  },
  {
    icon1: <FaMoneyCheckDollar size={20} />,
    icon2: <FaPlus size={10} color="#60a5fa" />,
    title: "Salary wilson",
    date: "Mon 01 Nov",
    amount: 2489.0,
  },
  {
    icon1: <FaMoneyCheckDollar size={20} />,
    icon2: <FaPlus size={10} color="#60a5fa" />,
    title: "Salary wilson",
    date: "Mon 16 Nov",
    amount: 2489.0,
  },
];

import { FaDollarSign, FaMoneyCheckDollar } from "react-icons/fa6";
import SingleTransaction from "./SingleTransaction";
import { FaPlus } from "react-icons/fa";

export default function RecentIncomes() {
  return (
    <div className="w-full  bg-white rounded-xl p-4 mt-4 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h1>Recent Incomes</h1>
        <Link href="/incomes" className="underline text-blue-400 text-sm">
          View All
        </Link>
      </div>
      <div className="flex items-end justify-end mr-6">
        <FaDollarSign />
      </div>
      <div className="flex flex-col space-y-4">
        {items.map((item) => (
          <SingleTransaction
            key={item.date}
            icon1={item.icon1}
            icon2={item.icon2}
            title={item.title}
            date={item.date}
            amount={item.amount}
          />
        ))}
      </div>
    </div>
  );
}
