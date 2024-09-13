import "dotenv/config";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL;

//console.log("env", process.env.MONGODB_URL);

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDB = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) {
    console.error("MONGODB_URI is missing from environment variables.");
    throw new Error("MONGODB_URI is missing");
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "expense-tracker",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  return cached.conn;
};
// import mongoose from "mongoose";

// let isConnected: boolean = false;

// export const connectToDB = async (): Promise<void> => {
//   mongoose.set("strictQuery", true);

//   if (isConnected) {
//     console.log("MongoDB is already connected");
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URL || "", {
//       dbName: "expense-tracker",
//     });

//     isConnected = true;
//     console.log("MongoDB is connected");
//   } catch (err) {
//     console.log(err);
//   }
// };
// import mongoose from 'mongoose';

// mongoose.connect(process.env.MONGODB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// lib/mongodb.ts
// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URL as string;

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

// let cached = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }

// async function connectToDB() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default connectToDB;
