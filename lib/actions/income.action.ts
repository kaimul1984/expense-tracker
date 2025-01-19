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
};

export async function createIncome({ income, path }: CreateIncomeProps) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not authenticated");
  }

  const userId = user.id;

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
