import { Button } from "@/components/ui/button";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
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
import { Input } from "@/components/ui/input";
import { Pencil, Plus } from "lucide-react";
import { FormComponent } from "@/components/Form";
import { DeleteBtn } from "@/components/DeleteBtn";
import { IExpense } from "@/lib/models/expense.model";
import { getAllExpenses } from "@/lib/actions/expense.action";
import { format, parseISO } from "date-fns";
import PaginationBtn from "@/components/Pagination";
import IconComponent from "@/components/IconComponent";
import iconMapping, { IconKey } from "@/lib/icon-mapping";
import Link from "next/link";

export default async function Expenses() {
  const expenses: IExpense[] = await getAllExpenses();
  const IconUncategorised = iconMapping.Uncategoriesed;

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
            <DialogTitle>Add expenses</DialogTitle>
            <DialogDescription>
              Add your daily expenses in the database. Click submit when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormComponent />
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
            <TableHead>Details</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Payee</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Pay Method</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.length > 0 ? (
            expenses.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">
                  {format(parseISO(item.createdAt.toString()), "dd LLL, yyyy")}
                  {/* {item.date} */}
                </TableCell>
                <TableCell className="font-medium capitalize flex gap-2 items-center">
                  {item.category ? (
                    <IconComponent category={item.category} />
                  ) : (
                    <IconUncategorised className="text-2xl" />
                  )}
                  {item.details}
                </TableCell>
                <TableCell className="font-medium capitalize">
                  {item.category ? (
                    item.category.categoryName
                  ) : (
                    <p>uncategorised</p>
                  )}
                </TableCell>
                <TableCell className="capitalize">{item.payee}</TableCell>
                <TableCell>${item.amount}</TableCell>
                <TableCell className="capitalize">{item.payMethod}</TableCell>
                <TableCell className="justify-end flex items-center gap-2">
                  <Link
                    href={`/dashboard/expenses/${item._id}`}
                    className="rounded-md bg-blue-200 p-2"
                  >
                    <Pencil color="#000" size={20} />
                  </Link>

                  {/* <button className="rounded-md bg-red-700 p-1">Delete</button> */}
                  <DeleteBtn idForDelete={item._id} type="expenses" />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <p>no Expenses found</p>
          )}
        </TableBody>
      </Table>
      <PaginationBtn />
    </div>
  );
}
