import { FaPlus } from "react-icons/fa";
import iconMapping, { IconKey } from "@/lib/icon-mapping";

type CategoryProps = {
  category: {
    _id: string;
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
      className="odd:bg-blue-200 even:bg-teal-200 p-4 flex flex-col gap-2 w-[200px] rounded-md"
    >
      <div className="flex items-center gap-2">
        <div className="size-12 rounded-full flex items-center justify-center bg-slate-100">
          {Icon && <Icon className="text-2xl" />}
        </div>
        <p className="font-bold text-[1.2rem] capitalize">
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
  );
}
