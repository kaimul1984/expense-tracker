"use client";

import { calculateMonthlyBalance } from "@/lib/actions/balance.action";
import { useEffect, useState } from "react";
import Card from "./Card";
import { FaEquals, FaMinus, FaPlus } from "react-icons/fa";

const MonthlyTracker = ({ userId }: { userId: string }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Months are 1-indexed
  const [data, setData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const fetchMonthlyData = async () => {
    try {
      const data = await calculateMonthlyBalance(
        userId,
        parseInt(year.toString()),
        parseInt(month.toString())
      );

      //   const result = await res.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching monthly data:", error);
    }
  };

  useEffect(() => {
    fetchMonthlyData();
  }, []);

  return (
    <div className="flex flex-col space-y-6">
      <div className="w-full flex items-center justify-center gap-8 bg-white py-4 px-8 rounded-md">
        <div className="bg-neutral-200 p-2 rounded-md">
          <label>Year: </label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            min="2000"
            max="2100"
            className="py-1 px-2 rounded-md"
          />
        </div>
        <div className="bg-neutral-200 p-2 rounded-md">
          <label>Month: </label>
          <select
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            className="py-1 px-2 rounded-md"
          >
            {[...Array(12)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {new Date(0, index).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-neutral-200 rounded-md px-4 py-2 hover:bg-neutral-300 hover:text-white hover:underline"
          onClick={fetchMonthlyData}
        >
          Get Monthly Data
        </button>
        <h3 className="bg-neutral-200 p-2 rounded-md">
          Results for{" "}
          <span className="px-2 py-1 bg-green-300 rounded-md">
            {" "}
            {new Date(year, month - 1).toLocaleString("default", {
              month: "long",
            })}
            :
          </span>
        </h3>
      </div>

      <div>
        <div className="flex flex-wrap gap-4 mb-4">
          <Card
            title="Incomes"
            icon=<FaPlus size={20} />
            number={data.totalIncome}
            month={month}
            yaer={year}
          />
          <Card
            title="Expenses"
            icon=<FaMinus size={20} />
            number={data.totalExpense}
            month={month}
            yaer={year}
          />
          <Card
            title="Balances"
            icon=<FaEquals size={20} />
            number={data.balance}
            month={month}
            yaer={year}
          />
        </div>
      </div>
    </div>
  );
};

export default MonthlyTracker;
