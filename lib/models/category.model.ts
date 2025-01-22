import { model, models } from "mongoose";
import { Schema } from "mongoose";

export type ICategory = {
  _id: string;
  name: string;
  expenses: string[];
};

const CategorySchema = new Schema(
  {
    user: { type: String, required: true },
    name: { type: String, required: true, unique: false },
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
