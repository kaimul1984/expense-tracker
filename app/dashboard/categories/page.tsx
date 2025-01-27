import React, { Suspense } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

import CategoryBarChart from "@/components/CategoryBarChart";

import CategoryTransaction from "@/components/CategoryTransaction";
import { CategoryForm } from "@/components/CategoryForm";

import Categoryname from "@/components/Categoryname";
import { getAllCategoriesName } from "@/lib/actions/category.action";

type Props = {
  _id: string;
  name: string;
  expenses: string[];
};

export default async function Categories() {
  //const result = await getAllCategoriesName();
  return (
    <div className="w-full min-h-40 ">
      <div className="flex justify-between gap-4">
        <div className="w-2/3  ">
          <Dialog>
            <div className="flex items-center justify-between mb-4 bg-slate-500 py-4 px-2">
              <Input className="w-max" placeholder="Search for category" />
              <DialogTrigger
                asChild
                className=" flex gap-2 items-end justify-end "
              >
                <Button
                  variant="outline"
                  className="flex items-center justify-center bg-teal-200 float-right text-slate-900"
                >
                  <Plus />
                  Add Category
                </Button>
              </DialogTrigger>
            </div>
            <DialogContent className="max-w-[420px] lg:max-w-[1000px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <CategoryForm type="create" />
              </div>
            </DialogContent>
          </Dialog>
          {/* category box */}
          <div className="flex items-center justify-center flex-wrap gap-4 mt-8 py-4">
            <Categoryname />
          </div>
          {/* bar chart */}

          <CategoryBarChart />
        </div>
        <div className="w-1/3  p-4">
          <CategoryTransaction />
        </div>
      </div>
    </div>
  );
}
