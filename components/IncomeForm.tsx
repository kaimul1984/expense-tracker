"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createIncome, updateIncomes } from "@/lib/actions/income.action";
import { useRouter } from "next/navigation";
import IncomeDropdown from "./IncomeDropdown";

const formSchema = z.object({
  employer: z.string().min(2),
  type: z.string(),
  payMethod: z.string(),
  amount: z.coerce.number().min(0.1),
});

type IncomeProps = {
  employer: string;
  type: string;
  payMethod: string;
  amount: number;
};

type IncomeFormProps = {
  userId: string;
  type: "create" | "update";
  income?: IncomeProps;
  incomeId?: string;
};

const defaultIncomes = {
  employer: "",
  type: "",
  payMethod: "",
  amount: 0.1,
};

export function IncomeForm({
  userId,
  type,
  income,
  incomeId,
}: IncomeFormProps) {
  const router = useRouter();
  const initialValues =
    income && type === "update" ? { ...income } : defaultIncomes;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // create

    if (type === "create") {
      try {
        const newIncomes = await createIncome({
          income: { ...values },
          path: "/dashboard/incomes",
          userId,
        });
        if (newIncomes) {
          form.reset();
          router.push("/dashboard/incomes");
        }
      } catch (error) {
        console.error(error);
      }
    }

    // update
    if (type === "update") {
      if (!incomeId) {
        router.back();
        return;
      }

      try {
        const updatedIncome = await updateIncomes({
          income: { ...values, _id: incomeId },
          path: `/dashboard/incomes/${incomeId}`,
          userId,
        });

        if (updatedIncome) {
          form.reset();
          router.push("/dashboard/incomes");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <div className="w-full flex flex-wrap gap-8">
          <div className="w-[45%]">
            <FormField
              control={form.control}
              name="employer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employer</FormLabel>
                  <FormControl>
                    <Input placeholder="Employer name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="w-[45%]">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="Type of your Income" {...field} /> */}
                    <IncomeDropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-[45%]">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Add amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-[45%]">
            <FormField
              control={form.control}
              name="payMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receive Method</FormLabel>
                  <FormControl>
                    <Input placeholder="Receive method" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button type="submit">
            {type === "create" ? "Submit" : "Update"}
          </Button>
          <Button onClick={() => router.back()} className="bg-red-400">
            {type === "update" ? "Cancel" : ""}
          </Button>
        </div>
      </form>
    </Form>
  );
}
