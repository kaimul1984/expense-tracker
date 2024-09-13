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
import { createExpense } from "@/lib/actions/expense.action";

const formSchema = z.object({
  details: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  category: z.string(),
  payee: z.string(),
  amount: z.coerce.number().min(0.1),
  payMethod: z.string(),
});

export function FormComponent() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      details: "",
      category: "",
      payee: "",
      amount: 0.1,
      payMethod: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //console.log(values);
    try {
      const newExpenses = await createExpense({
        expense: { ...values },
        path: "/dashboard/expenses",
      });

      if (newExpenses) {
        form.reset();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* details */}
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details</FormLabel>
              <FormControl>
                <Input placeholder="Add details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col lg:flex-row items-center gap-4">
          <div className=" w-full lg:flex-1 flex flex-col gap-2">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Add category" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full lg:flex-1  flex flex-col gap-2">
            <FormField
              control={form.control}
              name="payee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payee</FormLabel>
                  <FormControl>
                    <Input placeholder="Add payee" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <div className="w-full lg:flex-1 flex flex-col gap-2 ">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Add amount" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-2">
            <FormField
              control={form.control}
              name="payMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment method</FormLabel>
                  <FormControl>
                    <Input placeholder="Add pay method" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
