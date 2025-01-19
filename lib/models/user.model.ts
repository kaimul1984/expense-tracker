import { model, models } from "mongoose";
import { Schema } from "mongoose";

export type IUser = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
};

const UserSchema = new Schema(
  {
    clerkId: String,
    email: String,
    username: String,
    firstName: String,
    lastName: String,
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);
export default User;
