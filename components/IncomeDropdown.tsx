import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/category.action";
import { ICategory } from "@/lib/models/category.model";

import { startTransition, useEffect, useState } from "react";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const incomesTypes = [
  { id: "salary", title: "salary" },
  { id: "bonus", title: "bonus" },
  { id: "freelance", title: "freelance" },
  { id: "profit", title: "profit" },
];

export default function IncomeDropdown({
  value,
  onChangeHandler,
}: DropdownProps) {
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className=" border-slate-200 bg-slate-100 placeholder:text-white">
        <SelectValue placeholder="Income type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {incomesTypes.map((category) => (
            <SelectItem
              key={category.id}
              value={category.id}
              className="select-item p-regular-14 capitalize"
            >
              {category.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
