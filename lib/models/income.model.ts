import { model, models, Schema } from "mongoose";

export type IIncome = {
  employer: string;
  type: string;
  amount: number;
  payMethod: string;
};

const IncomeSchema = new Schema(
  {
    employer: String,
    type: String,
    amount: Number,
    payMethod: String,
  },
  { timestamps: true }
);

const Income = models.Income || model("Income", IncomeSchema);
export default Income;
