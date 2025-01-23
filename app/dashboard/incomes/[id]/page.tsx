import { IncomeForm } from "@/components/IncomeForm";
import { getIncomeById } from "@/lib/actions/income.action";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function UpdateIncome({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const user = await currentUser();

  const userId = user?.id as string;
  const income = await getIncomeById(id);
  //console.log(income);
  return (
    <section className="p-8">
      <h1>Update Incomes</h1>
      <div className="my-6 h-[1px] w-full bg-slate-900" />
      <IncomeForm
        type="update"
        userId={userId}
        income={income}
        incomeId={income._id}
      />
    </section>
  );
}
