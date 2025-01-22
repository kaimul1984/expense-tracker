import { model, models, Schema } from "mongoose";

export type IIncome = {
  employer: string;
  type: string;
  amount: number;
  payMethod: string;
};

const IncomeSchema = new Schema(
  {
    user: { type: String, required: true }, // Link to User
    employer: { type: String, required: true },
    type: {
      type: String,
      required: true,
    },
    amount: { type: Number, required: true, min: 0 },
    payMethod: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Income = models.Income || model("Income", IncomeSchema);
export default Income;
