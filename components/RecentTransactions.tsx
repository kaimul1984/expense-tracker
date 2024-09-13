import Link from "next/link";
import React from "react";
import { FaGasPump, FaMinus, FaPlus, FaTicketAlt } from "react-icons/fa";
import {
  FaBasketShopping,
  FaDollarSign,
  FaMoneyCheckDollar,
} from "react-icons/fa6";
import { GiClothes } from "react-icons/gi";
import {
  MdOutlineLocalGroceryStore,
  MdOutlineRestaurant,
} from "react-icons/md";
import SingleTransaction from "./SingleTransaction";

const items = [
  {
    icon1: <FaMoneyCheckDollar size={20} />,
    icon2: <FaPlus size={10} color="#60a5fa" />,
    title: "Salary wilson",
    date: "Mon 02 Sep",
    amount: 2489.0,
  },
  {
    icon1: <MdOutlineRestaurant size={20} />,
    icon2: <FaMinus size={10} color="#ef4444" />,
    title: "Launch Restaurant",
    date: "Wed 01 Oct",
    amount: 189.0,
  },
  {
    icon1: <MdOutlineLocalGroceryStore size={20} />,
    icon2: <FaMinus size={10} color="#ef4444" />,
    title: "Grocery Woolworths",
    date: "Fri 17 Oct",
    amount: 149.0,
  },
  {
    icon1: <FaMoneyCheckDollar size={20} />,
    icon2: <FaPlus size={10} color="#60a5fa" />,
    title: "Salary wilson",
    date: "Mon 18 Sep",
    amount: 2789.0,
  },
  {
    icon1: <FaBasketShopping size={20} />,
    icon2: <FaMinus size={10} color="#ef4444" />,
    title: "Grocery Local shop",
    date: "Mon 01 Nov",
    amount: 89.0,
  },
  {
    icon1: <GiClothes size={20} />,
    icon2: <FaMinus size={10} color="#ef4444" />,
    title: "Clothes Kmart",
    date: "sat 16 Nov",
    amount: 150.0,
  },
];

export default function RecentTransaction() {
  return (
    <div className="w-full  bg-white rounded-xl p-4 mt-4 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h1>Recent Transaction History</h1>
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
