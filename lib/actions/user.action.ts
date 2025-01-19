//import { CreateUserParams } from "@/types";

// import User, { IUser } from "../models/user.model";
// import { connectToDB } from "../database/db";

// export async function createUser(user: IUser) {
//   try {
//     await connectToDB();

//     const newUser = await User.create(user);
//     return JSON.parse(JSON.stringify(newUser));
//   } catch (error) {
//     console.error(error);
//   }
// }
"use server";
import User, { type IUser } from "../models/user.model";
import { connectToDB } from "../database/db";

export async function createUser(user: IUser) {
  try {
    // Connect to the database
    await connectToDB();

    // Validate user input before creation
    if (!user.email || !user.firstName) {
      throw new Error("Email and name are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Create new user
    const newUser = await User.create(user);

    // Convert Mongoose document to plain JavaScript object
    // This helps remove Mongoose-specific metadata
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    // Log the full error for server-side debugging
    console.error("Error creating user:", error);

    // Throw a more specific error for the caller to handle
    if (error instanceof Error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }

    // Fallback error if something unexpected occurs
    throw new Error("An unexpected error occurred while creating the user");
  }
}

// // Optional: Server Action wrapper for Next.js App Router
// 'use server'
// export async function createUserAction(formData: FormData) {
//   const userData: IUser = {
//     email: formData.get('email') as string,
//     name: formData.get('name') as string,
//     // Add other fields as necessary
//   };

//   try {
//     const user = await createUser(userData);
//     return { success: true, user };
//   } catch (error) {
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : 'An error occurred'
//     };
//   }
// }
