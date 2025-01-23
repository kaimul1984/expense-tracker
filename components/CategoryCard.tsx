import { FaPlus } from "react-icons/fa";
import iconMapping, { IconKey } from "@/lib/icon-mapping";
import Link from "next/link";
import { Pencil } from "lucide-react";

type CategoryProps = {
  category: {
    _id: string;
    slug: string;
    categoryName: string;
    totalExpense: number;
    iconName: IconKey;
  };
};

export default function CategoryCard({ category }: CategoryProps) {
  const Icon = iconMapping[category.iconName] || (() => null);
  return (
    <div
      key={category._id}
      className="odd:bg-blue-200 even:bg-teal-200 p-4 flex flex-col gap-2 w-[180px] rounded-md relative"
    >
      <div className="flex items-center gap-2">
        <div className="size-12 rounded-full flex items-center justify-center bg-slate-100">
          {Icon && <Icon className="text-2xl" />}
        </div>
        <p className="font-bold text-sm capitalize">{category.categoryName}</p>
      </div>
      <div className="flex items-center gap-2 justify-center">
        <FaPlus />
        <span className="text-blue-600 text-xl font-bold">
          {category.totalExpense}
        </span>
      </div>
      <Link
        href={`/dashboard/categories/${category.slug}`}
        className="rounded-md py-[10px] px-3 hover:bg-blue-100 hover:text-blue-700 absolute top-1 right-1"
        passHref
      >
        <Pencil size={15} />
      </Link>
    </div>
  );
}
