"use client";
import Image from "next/image";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Fuel",
    lastMonth: 4000,
    currentMonth: 2400,
  },
  {
    name: "Restuarent",
    lastMonth: 3000,
    currentMonth: 1398,
  },
  {
    name: "Ticket",
    lastMonth: 2000,
    currentMonth: 9800,
  },
  {
    name: "Grocery",
    lastMonth: 2780,
    currentMonth: 3908,
  },
  {
    name: "Utilities",
    lastMonth: 1890,
    currentMonth: 4800,
  },
  {
    name: "Clothes",
    lastMonth: 2390,
    currentMonth: 3800,
  },
  {
    name: "Mortgage",
    lastMonth: 3490,
    currentMonth: 4300,
  },
  {
    name: "Finance",
    lastMonth: 3490,
    currentMonth: 4300,
  },
  {
    name: "Rent",
    lastMonth: 3490,
    currentMonth: 4300,
  },
  {
    name: "Credit",
    lastMonth: 3490,
    currentMonth: 4300,
  },
  {
    name: "Page G",
    lastMonth: 3490,
    currentMonth: 4300,
  },
];

export default function CategoryBarChart() {
  return (
    <div className="w-full h-[450px] bg-white rounded-xl p-4 shadow-xl mt-8">
      <div className="flex items-center justify-between mb-8">
        <h1>Monthly Activity</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={450} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="lastMonth"
            fill="#8884d8"
            legendType="circle"
            radius={[10, 10, 0, 0]}
            barSize={10}
          />
          <Bar
            dataKey="currentMonth"
            fill="#82ca9d"
            legendType="circle"
            radius={[10, 10, 0, 0]}
            barSize={10}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
