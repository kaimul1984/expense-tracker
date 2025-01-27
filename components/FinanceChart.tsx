"use client";

import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const FinanceChart = ({ data }) => {
  return (
    <div className="w-full h-full bg-white rounded-xl p-4 shadow-xl">
      <div className="flex items-center justify-between ">
        <h1>Monthly Activity</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart width={450} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#0f172a", fontSize: "12" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: "12" }}
            tickLine={false}
            tickMargin={20}
          />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="incomes"
            stroke="#5eead4"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#93c5fd"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
