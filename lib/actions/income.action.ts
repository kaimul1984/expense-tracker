"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../database/db";
import Income from "../models/income.model";
import { currentUser } from "@clerk/nextjs/server";

type CreateIncomeProps = {
  income: {
    employer: string;
    type: string;
    amount: number;
    payMethod: string;
  };
  path: string;
  userId: string;
};

export async function createIncome({
  income,
  path,
  userId,
}: CreateIncomeProps) {
  try {
    await connectToDB();
    const newIncomes = await Income.create({
      ...income,
      user: userId,
    });

    revalidatePath(path);
    return JSON.parse(JSON.stringify(newIncomes));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create income.");
  }
}

//get income

export const getAllIncomes = async (userId: string) => {
  try {
    await connectToDB();

    const incomes = await Income.find({ user: userId });

    return JSON.parse(JSON.stringify(incomes));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch incomes.");
  }
};
