// app/lib/icon-mapping.ts

import {
  FaTicketAlt,
  FaShoppingCart,
  FaGasPump,
  FaUtensils,
  FaMoneyBillWave,
  FaLightbulb,
  FaShoppingBag,
  FaTheaterMasks,
  FaGift,
  FaGraduationCap,
} from "react-icons/fa";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { IoCardOutline, IoPencilOutline } from "react-icons/io5";
import { BsPiggyBank, BsGraphUp } from "react-icons/bs";
import { AiOutlineDollarCircle } from "react-icons/ai";

type IconKey =
  | "Ticket"
  | "Grocery"
  | "Fuel"
  | "Restaurants"
  | "Installments"
  | "Utilities"
  | "Shopping"
  | "Entertainments"
  | "GiftDonations"
  | "Education"
  | "Miscellaneous"
  | "GiReceiveMoney"
  | "GiPayMoney"
  | "IoCardOutline"
  | "IoPencilOutline"
  | "BsPiggyBank"
  | "BsGraphUp";

const iconMapping: { [key in IconKey]: any } = {
  Ticket: FaTicketAlt,
  Grocery: FaShoppingCart,
  Fuel: FaGasPump,
  Restaurants: FaUtensils,
  Installments: FaMoneyBillWave,
  Utilities: FaLightbulb,
  Shopping: FaShoppingBag,
  Entertainments: FaTheaterMasks,
  GiftDonations: FaGift,
  Education: FaGraduationCap,
  Miscellaneous: AiOutlineDollarCircle,
  GiReceiveMoney: GiReceiveMoney,
  GiPayMoney: GiPayMoney,
  IoCardOutline: IoCardOutline,
  IoPencilOutline: IoPencilOutline,
  BsPiggyBank: BsPiggyBank,
  BsGraphUp: BsGraphUp,

  // Add more icons here
};

export type { IconKey };
export default iconMapping;
