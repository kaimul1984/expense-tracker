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
type UpdateIncomeProps = {
  income: {
    _id: string;
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

export async function getIncomeById(id: string) {
  try {
    await connectToDB();
    const income = await Income.findOne({ _id: id });
    if (!income) throw new Error("income not found");
    return JSON.parse(JSON.stringify(income));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch incomes.");
  }
}

// update

export const updateIncomes = async ({
  income,
  path,
  userId,
}: UpdateIncomeProps) => {
  try {
    await connectToDB();
    const updateIncome = await Income.findByIdAndUpdate(
      income._id,
      {
        ...income,

        userId,
      },
      { new: true }
    );
    revalidatePath(path);
    return JSON.parse(JSON.stringify(updateIncome));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch incomes.");
  }
};

// DELETE
export async function deleteIncome({
  idForDelete,
  path,
}: {
  idForDelete: string;
  path: string;
}) {
  try {
    await connectToDB();

    const deletedIncome = await Income.findByIdAndDelete(idForDelete);
    if (deletedIncome) revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch incomes.");
  }
}
