import { model, models, Schema } from "mongoose";

export type IIncome = {
  employer: string;
  type: string;
  amount: number;
  payMethod: string;
};

const IncomeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Link to User
    employer: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["Salary", "Freelance", "Other"],
    },
    amount: { type: Number, required: true, min: 0 },
    payMethod: {
      type: String,
      required: true,
      enum: ["Cash", "Credit Card", "Bank Transfer"],
    },
  },
  { timestamps: true }
);

const Income = models.Income || model("Income", IncomeSchema);
export default Income;
