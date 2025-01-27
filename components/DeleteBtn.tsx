"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteCategory } from "@/lib/actions/category.action";
import { deleteIncome } from "@/lib/actions/income.action";

import { Delete, Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

type DeleteProps = {
  idForDelete: string;
  type: "category" | "income" | "expenses";
};

export function DeleteBtn({ idForDelete, type }: DeleteProps) {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="rounded-md bg-red-100 text-red-600 hover:text-white">
          <Trash2 size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 "
            onClick={() =>
              startTransition(async () => {
                if (type === "category") {
                  await deleteCategory({ idForDelete, path: pathname });
                }
                if (type === "income") {
                  await deleteIncome({ idForDelete, path: pathname });
                }
              })
            }
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
