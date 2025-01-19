"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../database/db";

import Category from "../models/category.model";
import Expense from "../models/expense.model";
import { currentUser } from "@clerk/nextjs/server";

type CategoryFormParams = {
  category: {
    name: string;
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
