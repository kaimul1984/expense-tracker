import { model, models } from "mongoose";
import { Schema } from "mongoose";

export type ICategory = {
  _id: string;
  name: string;
  expenses: string[];
};

const CategorySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Link to User
    name: { type: String, required: true, unique: false },
    expenses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Expense",
      },
    ],
  },
  { timestamps: true }
);

const Category = models.Category || model("Category", CategorySchema);
export default Category;
