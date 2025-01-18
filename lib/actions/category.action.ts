"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../database/db";

import Category from "../models/category.model";
import Expense from "../models/expense.model";

type CategoryFormParams = {
  category: {
    name: string;
  };
  path: string;
};

export async function createCategory({ category, path }: CategoryFormParams) {
  try {
    await connectToDB();
    const newCategory = await Category.create({
      ...category,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    console.error(error);
  }
}

// get request
export const getAllCategories = async () => {
  try {
    await connectToDB();

    // const categories = await Category.find()
    const categories = await Category.find().sort({ createdAt: -1 }).populate({
      path: "expenses",
      model: Expense,
    });

    if (!categories) throw new Error("Category not found");

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.log(error);
  }
};
