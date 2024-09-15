import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FaGasPump, FaPlus, FaTicketAlt } from "react-icons/fa";
import { FaBasketShopping, FaRegCreditCard } from "react-icons/fa6";
import { GiClothes } from "react-icons/gi";
import { HiCubeTransparent } from "react-icons/hi";
import { GrMoney } from "react-icons/gr";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import {
  MdOutlineLocalGroceryStore,
  MdOutlineRestaurant,
} from "react-icons/md";
import Category from "@/components/Category";
import CategoryBarChart from "@/components/CategoryBarChart";
import Image from "next/image";
import RecentExpenses from "@/components/RecentExpenses";
import CategoryTransaction from "@/components/CategoryTransaction";

const items = [
  {
    icon1: <FaGasPump size={20} />,
    title: "Fuel",
    amount: 89.0,
  },
  {
    icon1: <FaTicketAlt size={20} />,
    title: "Ticket",
    amount: 49.0,
  },
  {
    icon1: <MdOutlineRestaurant size={20} />,
    title: "Restaurant",
    amount: 189.0,
  },
  {
    icon1: <MdOutlineLocalGroceryStore size={20} />,
    title: "Grocery",
    amount: 249.0,
  },
  {
    icon1: <FaBasketShopping size={20} />,
    title: "Utilities",
    amount: 89.0,
  },
  {
    icon1: <GiClothes size={20} />,
    title: "Clothes",
    amount: 50.0,
  },
  {
    icon1: <HiCubeTransparent size={20} />,
    title: "Rent",
    amount: 50.0,
  },
  {
    icon1: <GrMoney size={20} />,
    title: "Mortgage",
    amount: 50.0,
  },
  {
    icon1: <RiMoneyDollarCircleLine size={20} />,
    title: "Finance",
    amount: 50.0,
  },
  {
    icon1: <FaRegCreditCard size={20} />,
    title: "Credit",
    amount: 50.0,
  },
];

export default function Categories() {
  return (
    <div className="w-full min-h-40 ">
      <div className="flex justify-between gap-4">
        <div className="w-2/3  ">
          <Dialog>
            <div className="flex items-center justify-between mb-4 bg-slate-500 py-4 px-2">
              <Input className="w-max" placeholder="Search for category" />
              <DialogTrigger
                asChild
                className=" flex gap-2 items-end justify-end "
              >
                <Button
                  variant="outline"
                  className="flex items-center justify-center bg-teal-200 float-right text-slate-900"
                >
                  <Plus />
                  Add Category
                </Button>
              </DialogTrigger>
            </div>
            <DialogContent className="max-w-[420px] lg:max-w-[1000px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">{/* <FormComponent /> */}</div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* category box */}
          <div className="flex items-center justify-center flex-wrap gap-4 mt-8 py-4">
            {items.map((item) => (
              <div
                key={item.title}
                className="odd:bg-blue-200 even:bg-teal-200 p-4 flex flex-col gap-2 w-[200px] rounded-md"
              >
                <div className="flex items-center gap-2">
                  <div className="size-12 rounded-full flex items-center justify-center bg-slate-100">
                    {item.icon1}
                  </div>
                  <p className="font-bold text-[1.2rem]">{item.title}</p>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <FaPlus />
                  <span className="text-blue-600 text-xl font-bold">
                    ${item.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* bar chart */}

          <CategoryBarChart />
        </div>
        <div className="w-1/3  p-4">
          <CategoryTransaction />
        </div>
      </div>
    </div>
  );
}
