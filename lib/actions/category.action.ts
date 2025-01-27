"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../database/db";

import Category from "../models/category.model";
import Expense from "../models/expense.model";
import { currentUser } from "@clerk/nextjs/server";
import { IconKey } from "../icon-mapping";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

type CategoryFormParams = {
  category: {
    categoryName: string;
    iconName: string;
  };
  path: string;
};
type UpdateFormParams = {
  category: {
    _id: string;
    categoryName: string;
    iconName: string;
  };
  path: string;
};

export async function createCategory({ category, path }: CategoryFormParams) {
  //console.log("category", category);
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
      slug: slugify(category.categoryName),
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    console.error(error);
  }
}

// // get request
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

//get categories by id

export const getCategoryById = async (id: string) => {
  try {
    await connectToDB();
    const category = await Category.findOne({ _id: id });

    if (!category) {
      throw new Error("categoryId not found");
    }
    return JSON.parse(JSON.stringify(category));
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categoryId.");
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
      .sort({ createdAt: 1 })
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
      slug: category.slug,
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

// update
export async function updateCategory({ category, path }: UpdateFormParams) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const userId = user.id;
  try {
    await connectToDB();
    const updateCategory = await Category.findByIdAndUpdate(
      category._id,
      { ...category, slug: slugify(category.categoryName), userId },
      { new: true }
    );
    revalidatePath(path);
    return JSON.parse(JSON.stringify(updateCategory));
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories.");
  }
}

//delete

export async function deleteCategory({
  idForDelete,
  path,
}: {
  idForDelete: string;
  path: string;
}) {
  try {
    await connectToDB();
    const deleteCategory = await Category.findByIdAndDelete(idForDelete);
    if (deleteCategory) revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to deleteCategory.");
  }
}
