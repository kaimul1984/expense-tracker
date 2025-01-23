import { model, models } from "mongoose";
import { Schema } from "mongoose";

export type ICategory = {
  _id: string;
  categoryName: string;
  slug: string;
  iconName: string;
  expenses: string[];
};

const CategorySchema = new Schema(
  {
    user: { type: String, required: true },
    categoryName: { type: String, required: true, unique: false },
    slug: { type: String, unique: true },
    iconName: { type: String },
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
