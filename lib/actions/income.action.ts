"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../database/db";
import Income from "../models/income.model";

type CreateIncomeProps = {
  income: {
    employer: string;
    type: string;
    amount: number;
    payMethod: string;
  };
  path: string;
};

export async function createIncome({ income, path }: CreateIncomeProps) {
  try {
    await connectToDB();
    const newIncomes = await Income.create({
      ...income,
    });

    revalidatePath(path);
    return JSON.parse(JSON.stringify(newIncomes));
  } catch (error) {
    console.error(error);
  }
}
