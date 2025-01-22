import Categoryname from "@/components/Categoryname";
import MonthlyTracker from "@/components/MonthlyTracker";
import { getAllCategoriesName } from "@/lib/actions/category.action";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function Month() {
  const user = await currentUser();

  const userId = user?.id as string;

  const year = 2025;
  const month = 1;
  const result = await getAllCategoriesName(
    parseInt(year.toString()),
    parseInt(month.toString())
  );

  console.log(result);
  return (
    <div className="w-screen min-h-screen p-20">
      <MonthlyTracker userId={userId} />
      {/* <Categoryname /> */}
    </div>
  );
}
