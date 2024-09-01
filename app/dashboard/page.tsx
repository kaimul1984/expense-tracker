import React from "react";
import Card from "@/components/Card";
import { FaNetworkWired } from "react-icons/fa";
import { SiExpensify } from "react-icons/si";
import { SiAwselasticloadbalancing } from "react-icons/si";

export default function Dashboard() {
  return (
    <section className="w-full">
      <div className="w-full p-4 bg-sky-800 h-28 flex items-center justify-end rounded-xl">
        <div className="flex flex-col ">
          <h1 className="text-5xl font-bold mb-4 text-white">02:30 pm</h1>
          <p className="text-right text-white">01-09-2024</p>
        </div>
      </div>
      <div className="w-full flex items-center flex-wrap mt-8">
        <div className="left w-2/3  p-4 flex flex-wrap gap-4">
          <Card
            title="Incomes"
            icon=<FaNetworkWired size={20} />
            number="5000"
          />
          <Card title="Expenses" icon=<SiExpensify size={20} /> number="3000" />
          <Card
            title="Balances"
            icon=<SiAwselasticloadbalancing size={20} />
            number="2000"
          />
        </div>
        <div className="right w-1/3 bg-rose-300 p-8">right</div>
      </div>
    </section>
  );
}
