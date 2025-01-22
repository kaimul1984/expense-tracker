import React from "react";
import Card from "@/components/Card";
import { FaEquals, FaMinus, FaPlus } from "react-icons/fa";

import FinanceChart from "@/components/FinanceChart";
import CategoryChart from "@/components/CategoryChart";

import Category from "@/components/Category";
import RecentIncomes from "@/components/RecentIncomes";
import RecentExpenses from "@/components/RecentExpenses";
import RecentTransaction from "@/components/RecentTransactions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { calculateBalance, getMonthlyData } from "@/lib/actions/balance.action";
import MonthlyTracker from "@/components/MonthlyTracker";

export default async function Dashboard() {
  const user = await currentUser();

  const userId = user?.id as string;
  const data = await getMonthlyData();
  //console.log(data);

  return (
    <section className="w-full">
      <div className="w-full flex flex-wrap ">
        {/* left */}
        <div className="left w-full lg:w-2/3  flex flex-col gap-4">
          {/* Card */}
          <MonthlyTracker userId={userId} />

          {/* Chart */}
          <div className="w-full h-[400px]">
            <FinanceChart data={data} />
          </div>
          <div className="w-full flex justify-between gap-4">
            <RecentIncomes />
            <RecentExpenses />
          </div>
        </div>
        {/* Right */}
        <div className="right w-full lg:w-1/3 px-4 min-w-[400px]">
          <div className="w-full h-[300px] shadow-xl">
            <CategoryChart />
          </div>
          <div className="w-full  bg-white rounded-xl p-4 mt-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h1>Categories</h1>
              <Image src="/moreDark.png" alt="" width={20} height={20} />
            </div>
            <div className="w-full flex items-center justify-between flex-wrap gap-2 ">
              <Category />
              <Category />
              <Category />
              <Category />
              <Category />
              <Category />
              <Category />
              <Category />
              <Category />
              <Category />
            </div>
          </div>
          <RecentTransaction />
        </div>
      </div>
    </section>
  );
}
