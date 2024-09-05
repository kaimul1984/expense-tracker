import React from "react";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa6";

export default function Category() {
  return (
    <div className="p-4 flex flex-col gap-2 odd:bg-blue-200 even:bg-teal-200 rounded-lg">
      <div className="flex flex-col gap-2">
        <div>
          <BsFillFuelPumpDieselFill />
        </div>
        <p className="font-bold">Patrol</p>
      </div>
      <div className="flex items-center gap-1">
        <FaDollarSign />
        <span>230</span>
      </div>
    </div>
  );
}
