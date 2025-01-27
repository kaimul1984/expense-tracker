import { FaPlus } from "react-icons/fa";
import iconMapping, { IconKey } from "@/lib/icon-mapping";
import Link from "next/link";
import { Pencil, Settings, Trash2 } from "lucide-react";
import { DeleteBtn } from "./DeleteBtn";
import { deleteCategory } from "@/lib/actions/category.action";

const dynamic = "force-dynamic";

const Category = {};

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
    <>
      <div className="odd:bg-blue-200 even:bg-teal-200 p-4   w-[180px] rounded-md relative ">
        <Link
          href={`/dashboard/category/${category.slug}`}
          className=" flex flex-col gap-2 p-1 group"
        >
          <div className=" flex items-center gap-2 ">
            <div className="size-12 rounded-full flex items-center justify-center bg-slate-100 group-hover:bg-slate-300">
              {Icon && <Icon className="text-2xl" />}
            </div>
            <p className="font-bold text-sm capitalize group-hover:underline group-hover:text-white transition-all duration-150 ease-linear ">
              {category.categoryName}
            </p>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <FaPlus />
            <span className="text-blue-600 text-xl font-bold">
              {category.totalExpense}
            </span>
          </div>
        </Link>
        {/* //settings */}
        <div className="absolute top-1 right-1  rounded-md group  cursor-pointer hover:bg-white transition-all duration-100 p-1">
          <Settings size={15} />

          <div className="absolute top-0 right-0 scale-0 bg-neutral-100 rounded-sm shadow-2xl z-50 p-2 group-hover:scale-100 flex items-center gap-4  transition-transform duration-150 ">
            <Link
              href={`/dashboard/categories/${category._id}`}
              className="p-2 hover:bg-gray-700 hover:text-white rounded-md"
              passHref
            >
              <Pencil size={15} />
            </Link>
            <DeleteBtn idForDelete={category._id} type="category" />
            {/* <button className="p-2 hover:bg-red-500 hover:text-white rounded-md">
              <Trash2 size={15} />
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}

// className=" bg-neutral-200 rounded-sm shadow-2xl z-50 p-2 group-hover:scale-1 flex items-center gap-4 absolute top-[-45px] right-0 transition-all duration-150 "
