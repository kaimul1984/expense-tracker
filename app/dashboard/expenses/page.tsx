import { Button } from "@/components/ui/button";
import React from "react";

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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil, Plus } from "lucide-react";
import { FormComponent } from "@/components/Form";
import { DeleteBtn } from "@/components/DeleteBtn";
import { IExpense } from "@/lib/models/expense.model";
import { getAllExpenses } from "@/lib/actions/expense.action";
import { format, parseISO } from "date-fns";
import PaginationBtn from "@/components/Pagination";

const invoices = [
  {
    _id: 1,
    date: "Mon 02, 2024",
    details: "vege, grocery, milk",
    category: "grocery",
    payee: "Woolworths",
    amount: "$250.00",
    payMethod: "Credit Card",
  },

  {
    _id: 2,
    date: "Tue 03, 2024",
    details: "vege, grocery, milk",
    category: "grocery",
    payee: "Woolworths",
    amount: "$250.00",
    payMethod: "Credit Card",
  },

  {
    _id: 3,
    date: "Wed 04, 2024",
    details: "vege, grocery, milk",
    category: "grocery",
    payee: "Woolworths",
    amount: "$250.00",
    payMethod: "Credit Card",
  },

  {
    _id: 4,
    date: "Mon 03, 2024",
    details: "vege, grocery, milk",
    category: "grocery",
    payee: "Woolworths",
    amount: "$250.00",
    payMethod: "Credit Card",
  },

  {
    _id: 5,
    date: "Mon 05, 2024",
    details: "vege, grocery, milk",
    category: "grocery",
    payee: "Woolworths",
    amount: "$250.00",
    payMethod: "Credit Card",
  },

  {
    _id: 6,
    date: "Mon 07, 2024",
    details: "vege, grocery, milk",
    category: "grocery",
    payee: "Woolworths",
    amount: "$250.00",
    payMethod: "Credit Card",
  },
  {
    _id: 7,
    date: "Mon 07, 2024",
    details: "vege, grocery, milk",
    category: "grocery",
    payee: "Woolworths",
    amount: "$250.00",
    payMethod: "Credit Card",
  },
  {
    _id: 8,
    date: "Mon 07, 2024",
    details: "vege, grocery, milk",
    category: "grocery",
    payee: "Woolworths",
    amount: "$250.00",
    payMethod: "Credit Card",
  },
  {
    _id: 9,
    date: "Mon 07, 2024",
    details: "vege, grocery, milk",
    category: "grocery",
    payee: "Woolworths",
    amount: "$250.00",
    payMethod: "Credit Card",
  },
  {
    _id: 10,
    date: "Mon 07, 2024",
    details: "vege, grocery, milk",
    category: "grocery",
    payee: "Woolworths",
    amount: "$250.00",
    payMethod: "Credit Card",
  },
];

export default async function Expenses() {
  const expenses: IExpense[] = await getAllExpenses();

  return (
    <div className="p-8 w-full">
      <Dialog>
        <div className="flex items-center justify-between mb-4">
          <h1>Transactions History</h1>
          <DialogTrigger asChild className=" flex gap-2 items-end justify-end ">
            <Button
              variant="outline"
              className="flex items-center justify-center bg-teal-200 float-right text-slate-900"
            >
              <Plus />
              Add Expenses
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="max-w-[420px] lg:max-w-[1000px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormComponent />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Table className="border-2 border-collapse">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Payee</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Pay Method</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">
                {/* {format(parseISO(item.createdAt.toString()), "dd LLL, yyyy")} */}
                {item.date}
              </TableCell>
              <TableCell className="font-medium capitalize">
                {item.details}
              </TableCell>
              <TableCell className="font-medium capitalize">
                {item.category}
              </TableCell>
              <TableCell className="capitalize">{item.payee}</TableCell>
              <TableCell>${item.amount}</TableCell>
              <TableCell className="capitalize">{item.payMethod}</TableCell>
              <TableCell className="text-right">
                <form action="" className="flex gap-1 items-end justify-end">
                  <Button className="rounded-md bg-blue-200 ">
                    <Pencil color="#000" size={20} />
                  </Button>

                  {/* <button className="rounded-md bg-red-700 p-1">Delete</button> */}
                  <DeleteBtn />
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationBtn />
    </div>
  );
}
