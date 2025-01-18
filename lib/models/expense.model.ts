import mongoose, { Date, model, models, Schema } from "mongoose";

export type IExpense = {
  _id: string;
  details: string;
  category: { _id: string; name: string };
  payee: string;
  amount: number;
  payMethod: string;
  createdAt: Date;
};

const ExpenseSchema = new Schema(
  {
    details: String,
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    payee: String,
    amount: Number,
    payMethod: String,
  },
  { timestamps: true }
);
const Expense = models.Expense || model("Expense", ExpenseSchema);
export default Expense;
// import mongoose, { model, models, Schema } from "mongoose";

// export type IExpense = {
//   details: string;
//   category: string;
//   payee: string;
//   amount: number; // This is fine as we convert Decimal128 to number
//   payMethod: string;
// };

// const ExpenseSchema = new Schema(
//   {
//     details: { type: String, required: true },
//     category: { type: String, required: true },
//     payee: { type: String, required: true },
//     amount: {
//       type: Schema.Types.Decimal128,
//       required: true,
//       get: (v: Schema.Types.Decimal128) =>
//         v ? parseFloat(v.toString()) : null,
//     },
//     payMethod: { type: String, required: true },
//   },
//   { timestamps: true, toJSON: { getters: true }, toObject: { getters: true } }
// );

// const Expense = models.Expense || model("Expense", ExpenseSchema);

// export default Expense;

// export type IExpense = {
//   details: string;
//   category: string;
//   payee: string;
//   amount: number; // This is fine as we convert Decimal128 to number
//   payMethod: string;
// };

// const ExpenseSchema = new Schema(
//   {
//     details: { type: String, required: true },
//     category: { type: String, required: true },
//     payee: { type: String, required: true },
//     amount: {
//       type: Schema.Types.Decimal128,
//       required: true,
//       get: (v: Schema.Types.Decimal128) =>
//         v ? parseFloat(v.toString()) : null,
//     },
//     payMethod: { type: String, required: true },
//   },
//   { timestamps: true, toJSON: { getters: true }, toObject: { getters: true } }
// );

// const Expenses = models.Expenses || model("Expenses", ExpenseSchema);

// export default Expenses;
