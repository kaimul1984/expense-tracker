"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../database/db";
import Category from "../models/category.model";
import Expense from "../models/expense.model";

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

export async function createExpense({ expense, path }: createExpenseParams) {
  try {
    await connectToDB();

    const newExpense = await Expense.create({
      ...expense,
      category: expense.categoryId,
    });

    const category = await Category.findById(expense.categoryId);

    if (category) {
      category.expenses.push(newExpense._id);
      await category.save();
    }

    revalidatePath(path);
    return JSON.parse(JSON.stringify(newExpense));
  } catch (error) {
    console.log(error);
  }
}

// get request
export const getAllExpenses = async () => {
  try {
    await connectToDB();
    const expenses = await Expense.find().populate("category", "name");
    return JSON.parse(JSON.stringify(expenses));
  } catch (error) {
    console.error(error);
  }
};
