import React, { ReactNode } from "react";
import { IconType } from "react-icons";

type CardProps = {
  title: string;
  number: number;
  icon: ReactNode;
  month: number;
  yaer: number;
};

export default function Card({ icon, title, number, month, year }: CardProps) {
  return (
    <div className="p-2 flex-1 rounded-xl space-y-2 odd:bg-blue-200 even:bg-teal-200 shadow-xl">
      <div className="w-full flex items-center justify-between">
        <div className="size-12 rounded-full bg-slate-100 flex items-center justify-center  ">
          {icon}
        </div>
        <span>
          {" "}
          {new Date(year, month - 1).toLocaleString("default", {
            month: "long",
          })}
        </span>
      </div>
      <h1 className="text-xl font-semibold">{title}</h1>
      <h2 className="text-[1rem] font-bold">$ {number}</h2>
    </div>
  );
}
