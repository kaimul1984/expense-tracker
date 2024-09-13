"use server";

import { revalidatePath } from "next/cache";
import ExpensesModel from "../models/expense.model";
import { connectToDB } from "../database/db";
import fs from "fs";
const path = require("path");

type createExpenseParams = {
  expense: {
    details: string;
    category: string;
    payee: string;
    amount: number;
    payMethod: string;
  };
  path: string;
};

export async function createExpense({ expense, path }: createExpenseParams) {
  try {
    await connectToDB();

    const newExpense = await ExpensesModel.create({
      ...expense,
    });

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
    const expenses = await ExpensesModel.find();
    return JSON.parse(JSON.stringify(expenses));
  } catch (error) {
    console.error(error);
  }
};
