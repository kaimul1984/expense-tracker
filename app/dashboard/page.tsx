import React from "react";
import Card from "@/components/Card";
import { FaNetworkWired } from "react-icons/fa";
import { SiExpensify } from "react-icons/si";
import { SiAwselasticloadbalancing } from "react-icons/si";

import FinanceChart from "@/components/FinanceChart";
import CategoryChart from "@/components/CategoryChart";
import Image from "next/image";
import Category from "@/components/Category";
import RecentIncomes from "@/components/RecentIncomes";
import RecentExpenses from "@/components/RecentExpenses";
import RecentTransaction from "@/components/RecentTransactions";

export default function Dashboard() {
  return (
    <section className="w-full">
      <div className="w-full p-2  flex items-center justify-between rounded-xl bg-white shadow-xl mb-8">
        <div className="flex items-center gap-2">
          <div className="size-12 bg-gray-200 shadow-lg rounded-full flex items-center justify-center">
            1
          </div>
          <h2>Welcome back Kaimul Alam</h2>
        </div>
        <div className="flex flex-col ">
          <h1 className="text-3xl font-bold mb-4 ">02:30 pm</h1>
          <p className="text-right">01-09-2024</p>
        </div>
      </div>
      <div className="w-full flex  flex-wrap  ">
        {/* left */}
        <div className="left w-full lg:w-2/3  flex flex-col gap-4">
          {/* Card */}
          <div className="flex flex-wrap gap-4 mb-4">
            <Card
              title="Incomes"
              icon=<FaNetworkWired size={20} />
              number={5000}
            />
            <Card
              title="Expenses"
              icon=<SiExpensify size={20} />
              number={3000}
            />
            <Card
              title="Balances"
              icon=<SiAwselasticloadbalancing size={20} />
              number={2000}
            />
          </div>
          {/* Chart */}
          <div className="w-full h-[400px]">
            <FinanceChart />
          </div>
          <div className="w-full flex justify-between gap-4">
            <RecentIncomes />
            <RecentExpenses />
          </div>
        </div>
        {/* Right */}
        <div className="right w-1/3 px-4 min-w-[400px]">
          <div className="w-full h-[300px] shadow-xl">
            <CategoryChart />
          </div>
          <div className="w-full  bg-white rounded-xl p-4 mt-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h1>Categories</h1>
              <Image src="/moreDark.png" alt="" width={20} height={20} />
            </div>
            <div className="flex items-center justify-between flex-wrap gap-2 ">
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
