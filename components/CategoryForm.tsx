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
import { createCategory } from "@/lib/actions/category.action";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  categoryName: z.string().min(2),
  iconName: z.string(),
});

const categoryDefaultValues = {
  categoryName: "",
  iconName: "",
};

export function CategoryForm() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
      iconName: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      const newCategory = await createCategory({
        category: { ...values },
        path: "/dashboard/categories",
      });

      if (newCategory) {
        form.reset();
        router.push("/dashboard/categories");
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
          name="categoryName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CategoryTitle</FormLabel>
              <FormControl>
                <Input
                  placeholder="Add Title"
                  {...field}
                  className="capitalize"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="iconName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <FormControl>
                <Input
                  placeholder="Add category title here. First letter Capital "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
