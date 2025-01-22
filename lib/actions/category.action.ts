"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../database/db";

import Category from "../models/category.model";
import Expense from "../models/expense.model";
import { currentUser } from "@clerk/nextjs/server";
import { IconKey } from "../icon-mapping";

type CategoryFormParams = {
  category: {
    categoryName: string;
    iconName: string;
  };
  path: string;
};

export async function createCategory({ category, path }: CategoryFormParams) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not authincated");
  }

  const userId = user.id;

  try {
    await connectToDB();
    const newCategory = await Category.create({
      ...category,
      user: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    console.error(error);
  }
}

// get request
export const getAllCategories = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not authincated");
  }

  const userId = user.id;
  try {
    await connectToDB();

    // const categories = await Category.find()
    const categories = await Category.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "expenses",
        model: Expense,
      });

    if (!categories) throw new Error("Category not found");

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories.");
  }
};

//get categories by name

export const getCategoriesByName = async (name: string) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not authincated");
  }

  const userId = user.id;

  try {
    await connectToDB();
    const categoryName = await Category.findOne({ user: userId })
      .where({ name: name })
      .populate({
        path: "expenses",
        model: Expense,
      });
    if (!categoryName) {
      throw new Error("categoryname not found");
    }
    return JSON.parse(JSON.stringify(categoryName));
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categoriesName.");
  }
};

export const getAllCategoriesName = async (year: number, month: number) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const userId = user.id;

  try {
    await connectToDB();

    const startOfMonth = new Date(year, month - 1, 1); // Start of the month
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999); // End of the month

    // Fetch categories and dynamically calculate total expenses for the month
    const categories = await Category.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "expenses",
        model: Expense,
        match: { createdAt: { $gte: startOfMonth, $lte: endOfMonth } }, // Filter expenses by date
      });

    // // Add total expense for each category
    // const categoriesWithTotal = categories.map((category) => ({
    //   ...category.toObject(),
    //   totalExpense: category.expenses.reduce(
    //     (sum: number, expense: any) => sum + expense.amount,
    //     0
    //   ), // Sum expenses for the month
    // }));

    // Add total expense for each category and create plain javascript object for serialization.
    const categoriesWithTotal = categories.map((category) => ({
      _id: category._id.toString(), // Serialize MongoDB ObjectId
      user: category.user,
      categoryName: category.categoryName,
      iconName: category.iconName,
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt.toISOString(),
      totalExpense: category.expenses.reduce(
        (sum: number, expense: any) => sum + expense.amount,
        0
      ),
      expenses: category.expenses.map((expense: any) => ({
        _id: expense._id.toString(),
        amount: expense.amount,
        name: expense.name,
        createdAt: expense.createdAt.toISOString(),
        updatedAt: expense.updatedAt.toISOString(),
      })), //Sum expenses for the month
    }));

    return categoriesWithTotal;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories.");
  }
};
