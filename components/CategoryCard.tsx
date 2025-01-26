import { FaPlus } from "react-icons/fa";
import iconMapping, { IconKey } from "@/lib/icon-mapping";
import Link from "next/link";
import { Pencil, Settings, Trash2 } from "lucide-react";
import { DeleteBtn } from "./DeleteBtn";

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
      <div
        key={category._id}
        className="odd:bg-blue-200 even:bg-teal-200 p-4  w-[180px] rounded-md relative"
      >
        <div className=" flex flex-col gap-2">
          <div className=" flex items-center gap-2">
            <div className="size-12 rounded-full flex items-center justify-center bg-slate-100">
              {Icon && <Icon className="text-2xl" />}
            </div>
            <p className="font-bold text-sm capitalize ">
              {category.categoryName}
            </p>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <FaPlus />
            <span className="text-blue-600 text-xl font-bold">
              {category.totalExpense}
            </span>
          </div>
        </div>
        {/* //settings */}
        <div className="relative top-1 right-1  rounded-md group cursor-pointer ">
          <Settings
            size={15}
            className="hover:bg-white transition-all duration-100 p-1"
          />

          <div className=" bg-neutral-200 rounded-sm shadow-2xl z-50 p-2 group-hover:scale-1 flex items-center gap-4 absolute top-[-45px] right-0 transition-all duration-150 ">
            <Link
              href={`/dashboard/categories/${category._id}`}
              className="p-1 hover:bg-gray-200 rounded-md"
              passHref
            >
              <Pencil size={15} />
            </Link>
            {/* <DeleteBtn/> */}
            <button>
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
