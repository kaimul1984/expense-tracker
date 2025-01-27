import { IncomeForm } from "@/components/IncomeForm";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Plus } from "lucide-react";
import React from "react";
import { DeleteBtn } from "@/components/DeleteBtn";
import { currentUser } from "@clerk/nextjs/server";
import { deleteIncome, getAllIncomes } from "@/lib/actions/income.action";
import { Date } from "mongoose";
import { format, parseISO } from "date-fns";
import Link from "next/link";

type IncomeProps = {
  _id: string;
  createdAt: Date;
  employer: string;
  type: string;
  amount: number;
  payMethod: string;
};

const invoices = [
  {
    _id: 1,
    date: "Mon 02, 2024",
    employer: "wilson",
    type: "salary",
    amount: "$250.00",
    payMethod: "UpWork",
  },

  {
    _id: 2,
    date: "Tue 03, 2024",
    employer: "wilson",
    type: "salary",
    amount: "$250.00",
    payMethod: "Bank account",
  },

  {
    _id: 3,
    date: "Wed 04, 2024",
    employer: "wilson",
    type: "freelance",
    amount: "$250.00",
    payMethod: "Fiverr",
  },

  {
    _id: 4,
    date: "Mon 03, 2024",
    employer: "wilson",
    type: "salary",
    amount: "$250.00",
    payMethod: "Bank account",
  },

  {
    _id: 5,
    date: "Mon 05, 2024",
    employer: "wilson",
    type: "freelance",
    amount: "$250.00",
    payMethod: "Bank account",
  },

  {
    _id: 6,
    date: "Mon 07, 2024",
    employer: "wilson",
    type: "salary",
    amount: "$250.00",
    payMethod: "Bank account",
  },
];

export default async function Incomes() {
  const user = await currentUser();

  const userId = user?.id as string;

  const incomes: IncomeProps[] = await getAllIncomes(userId);

  return (
    <div className="p-8 w-full">
      <Dialog>
        <div className="flex items-center justify-between mb-4">
          <h1>Incomes History</h1>
          <DialogTrigger asChild className=" flex gap-2 items-end justify-end ">
            <Button
              variant="outline"
              className="flex items-center justify-center bg-teal-200 float-right text-slate-900"
            >
              <Plus />
              Add Income
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="max-w-[420px] lg:max-w-[1000px]">
          <DialogHeader>
            <DialogTitle>Add Income</DialogTitle>
            <DialogDescription>
              Add your Incomes in the database. Click submit when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <IncomeForm userId={userId} type="create" />
          </div>
          {/* <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
      <Table className="border-2 border-collapse">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Employer</TableHead>
            <TableHead> Income Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Receive Method</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incomes.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">
                {/* {format(parseISO(item.createdAt.toString()), "dd LLL, yyyy")} */}
                {format(parseISO(item.createdAt.toString()), "dd LLL, yyyy")}
              </TableCell>
              <TableCell className="font-medium capitalize">
                {item.employer}
              </TableCell>
              <TableCell className="font-medium capitalize">
                {/* {item.category && item.category.name} */}
                {item.type}
              </TableCell>

              <TableCell>${item.amount}</TableCell>
              <TableCell className="capitalize">{item.payMethod}</TableCell>
              <TableCell className="text-right flex gap-1 items-end justify-end">
                <Link
                  href={`/dashboard/incomes/${item._id}`}
                  className="rounded-md bg-blue-200 py-[10px] px-3 hover:bg-blue-950 hover:text-white "
                >
                  <Pencil size={20} />
                </Link>

                {/* <button className="rounded-md bg-red-700 p-1">Delete</button> */}
                <DeleteBtn idForDelete={item._id} type="income" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
