"use server";

import { currentUser } from "@clerk/nextjs/server";
import { connectToDB } from "../database/db";
import Expense from "../models/expense.model";
import Income from "../models/income.model";

export async function calculateBalance(userId: string) {
  try {
    await connectToDB();

    // Calculate total income
    const incomeResult = await Income.aggregate([
      { $match: { user: userId } }, // Filter by user ID
      { $group: { _id: null, totalIncome: { $sum: "$amount" } } }, // Sum the 'amount' field
    ]);

    const totalIncome =
      incomeResult.length > 0 ? incomeResult[0].totalIncome : 0;

    // Calculate total expense
    const expenseResult = await Expense.aggregate([
      { $match: { user: userId } }, // Filter by user ID
      { $group: { _id: null, totalExpense: { $sum: "$amount" } } }, // Sum the 'amount' field
    ]);

    const totalExpense =
      expenseResult.length > 0 ? expenseResult[0].totalExpense : 0;

    // Calculate balance
    const balance = totalIncome - totalExpense;

    return { totalIncome, totalExpense, balance };
  } catch (error) {
    console.error("Error calculating balance:", error);
    throw new Error("Failed to calculate balance.");
  }
}

//monthly

export async function calculateMonthlyBalance(
  userId: string,
  year: number,
  month: number
) {
  try {
    await connectToDB();

    // Define the start and end of the month
    const startOfMonth = new Date(year, month - 1, 1); // Month is 0-indexed
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999); // Last day of the month

    // Calculate total income for the month
    const incomeResult = await Income.aggregate([
      {
        $match: {
          user: userId,
          createdAt: { $gte: startOfMonth, $lte: endOfMonth }, // Filter by date range
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$amount" }, // Sum the income amount
        },
      },
    ]);
    const totalIncome =
      incomeResult.length > 0 ? incomeResult[0].totalIncome : 0;

    // Calculate total expenses for the month
    const expenseResult = await Expense.aggregate([
      {
        $match: {
          user: userId,
          createdAt: { $gte: startOfMonth, $lte: endOfMonth }, // Filter by date range
        },
      },
      {
        $group: {
          _id: null,
          totalExpense: { $sum: "$amount" }, // Sum the expense amount
        },
      },
    ]);
    const totalExpense =
      expenseResult.length > 0 ? expenseResult[0].totalExpense : 0;

    // Calculate the balance for the month
    const balance = totalIncome - totalExpense;

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  } catch (error) {
    console.error("Error calculating monthly balance:", error);
    throw new Error("Failed to calculate monthly balance.");
  }
}

//get monthly data for barchart

export async function getMonthlyData() {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const userId = user.id;
  try {
    await connectToDB();

    const startOfYear = new Date(new Date().getFullYear(), 0, 1); // Start of the year
    const endOfYear = new Date(
      new Date().getFullYear(),
      11,
      31,
      23,
      59,
      59,
      999
    ); // End of the year

    // Group incomes by month
    const incomeData = await Income.aggregate([
      {
        $match: {
          user: userId,
          createdAt: { $gte: startOfYear, $lte: endOfYear },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month
          incomes: { $sum: "$amount" }, // Sum the income amount
        },
      },
    ]);

    // Group expenses by month
    const expenseData = await Expense.aggregate([
      {
        $match: {
          user: userId,
          createdAt: { $gte: startOfYear, $lte: endOfYear },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month
          expenses: { $sum: "$amount" }, // Sum the expense amount
        },
      },
    ]);

    // Combine data into a single array with default 0 values
    const monthlyData = Array.from({ length: 12 }, (_, index) => ({
      month: new Date(0, index).toLocaleString("default", { month: "short" }), // Jan, Feb, etc.
      incomes: 0,
      expenses: 0,
    }));

    incomeData.forEach((data) => {
      monthlyData[data._id - 1].incomes = data.incomes; // Match month index
    });

    expenseData.forEach((data) => {
      monthlyData[data._id - 1].expenses = data.expenses; // Match month index
    });

    return monthlyData;
  } catch (error) {
    console.error("Error fetching monthly data:", error);
    throw new Error("Failed to fetch monthly data.");
  }
}
