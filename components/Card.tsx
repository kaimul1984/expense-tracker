import React from "react";
import { FaNetworkWired } from "react-icons/fa";

type CardProps = {
  title: string;
  number: number;
  icon: IconType;
};

export default function Card({ icon, title, number }) {
  return (
    <div className="p-4 flex-1 rounded-xl space-y-4 bg-sky-100">
      <div className="size-12 rounded-full bg-slate-100 flex items-center justify-center">
        {icon}
      </div>
      <h1 className="text-3xl font-semibold">{title}</h1>
      <h2 className="text-2xl font-bold">$ {number}</h2>
    </div>
  );
}
