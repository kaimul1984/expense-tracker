import React from "react";
import { Button } from "./ui/button";
import { FaGasPump, FaTicketAlt } from "react-icons/fa";
import { FaBasketShopping, FaDollarSign, FaMinus } from "react-icons/fa6";
import { GiClothes } from "react-icons/gi";
import {
  MdOutlineLocalGroceryStore,
  MdOutlineRestaurant,
} from "react-icons/md";
import SingleTransaction from "./SingleTransaction";

const data = [
  {
    name: "All",
  },
  {
    name: "Fuel",
  },
  {
    name: "Restuarent",
  },
  {
    name: "Ticket",
  },
  {
    name: "Grocery",
  },
  {
    name: "Utilities",
  },
  {
    name: "Clothes",
  },
  {
    name: "Mortgage",
  },
  {
    name: "Finance",
  },
  {
    name: "Rent",
  },
  {
    name: "Credit",
  },
];

const items = [
  {
    icon1: <FaGasPump size={20} />,
    icon2: <FaMinus size={10} color="#ef4444" />,
    title: "Patrol",
    date: "Mon 02 Sep",
    amount: 89.0,
  },
  {
    icon1: <FaTicketAlt size={20} />,
    icon2: <FaMinus size={10} color="#ef4444" />,
    title: "Opal ticket",
    date: "Tue 18 Sep",
    amount: 49.0,
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
    amount: 249.0,
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
    amount: 50.0,
  },
  {
    icon1: <FaGasPump size={20} />,
    icon2: <FaMinus size={10} color="#ef4444" />,
    title: "Patrol",
    date: "Mon 02 Sep",
    amount: 89.0,
  },
  {
    icon1: <FaTicketAlt size={20} />,
    icon2: <FaMinus size={10} color="#ef4444" />,
    title: "Opal ticket",
    date: "Tue 18 Sep",
    amount: 49.0,
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
    amount: 249.0,
  },
  {
    icon1: <FaTicketAlt size={20} />,
    icon2: <FaMinus size={10} color="#ef4444" />,
    title: "Opal ticket",
    date: "Tue 18 Sep",
    amount: 49.0,
  },
];

export default function CategoryTransaction() {
  return (
    <div className=" w-full flex flex-col bg-white shadow-2x ">
      <h3 className="bg-slate-600 p-2 text-white">Transaction History</h3>
      <div className="flex gap-2 flex-wrap items-center justify-center py-4">
        {data.map((item) => (
          <Button
            key={item.name}
            className=" bg-gray-800 first:bg-teal-500 first:text-black first:font-bold"
          >
            {item.name}
          </Button>
        ))}
      </div>
      <div className="w-full h-1 bg-slate-900" />

      <div className="flex flex-col space-y-4 mt-2 px-2 py-4">
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
