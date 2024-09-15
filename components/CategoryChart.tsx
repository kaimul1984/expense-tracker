"use client";

import Image from "next/image";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

// type PieProps = {
//   cx?: string | number | undefined ,
//   cy?: string | number | undefined ,
//   midAngle: number,
//   innerRadius: string | number |undefined ,
//   outerRadius: string | number | undefined ,
//   percent: any,
//   index:number
// }

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fontSize={12}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const data02 = [
  { name: "A1", value: 90 },
  { name: "A2", value: 85 },
  { name: "B1", value: 90 },
  { name: "B2", value: 80 },
  { name: "B3", value: 75 },
  { name: "B4", value: 60 },
  { name: "B5", value: 65 },
  { name: "C1", value: 70 },
];
export default function CategoryChart() {
  return (
    <div className="w-full h-full bg-white rounded-xl p-4">
      <div className="flex items-center justify-between ">
        <h1>Finance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Pie
            data={data02}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#99f6e4"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
