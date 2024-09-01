import { FaHome } from "react-icons/fa";
import { FaBuffer } from "react-icons/fa";
import { FaBezierCurve } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";

const nabItems = [
  {
    label: "Home",
    path: "/dashboard",
    icon: FaHome,
  },
  {
    label: "Expenses",
    path: "/dashboard/expenses",
    icon: FaBezierCurve,
  },
  {
    label: "Incomes",
    path: "/dashboard/incomes",
    icon: FaBuffer,
  },
  {
    label: "Categories",
    path: "/dashboard/categories",
    icon: BiCategoryAlt,
  },
];

export default nabItems;
