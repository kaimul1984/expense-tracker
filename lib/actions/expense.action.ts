"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../database/db";
import Category from "../models/category.model";
import Expense from "../models/expense.model";
import { currentUser } from "@clerk/nextjs/server";

type createExpenseParams = {
  expense: {
    details: string;
    categoryId: string;
    payee: string;
    amount: number;
    payMethod: string;
  };
  path: string;
};

type updateExpenseParams = {
  expense: {
    _id: string;
    details: string;
    categoryId: string;
    payee: string;
    amount: number;
    payMethod: string;
  };
  path: string;
};

export async function createExpense({ expense, path }: createExpenseParams) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not authincated");
  }

  const userId = user.id;

  try {
    await connectToDB();

    const category = await Category.findById(expense.categoryId);

    if (!category) {
      throw new Error("category not founded under this user");
    }

    const newExpense = await Expense.create({
      ...expense,
      category: expense.categoryId,
      user: userId,
    });

    if (category) {
      category.expenses.push(newExpense._id);
      await category.save();
    }

    revalidatePath(path);
    return JSON.parse(JSON.stringify(newExpense));
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create expense.");
  }
}

// get request
export const getAllExpenses = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not authincated");
  }

  const userId = user.id;
  try {
    await connectToDB();
    const expenses = await Expense.find({ user: userId }).populate({
      path: "category",
      select: "_id categoryName iconName",
    });
    return JSON.parse(JSON.stringify(expenses));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch expenses.");
  }
};

// update
export async function updateExpense() {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not authincated");
  }

  const userId = user.id;
  try {
    await connectToDB();
  } catch (error) {}
}

// delete

export async function deleteExpense() {
  try {
    await connectToDB();
  } catch (error) {}
}
