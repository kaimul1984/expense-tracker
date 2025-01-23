import iconMapping, { IconKey } from "@/lib/icon-mapping";
import React from "react";

type CategoryProps = {
  category: {
    _id: string;
    categoryName: string;
    iconName: string;
  };
};

export default function IconComponent({ category }: CategoryProps) {
  const Icon = iconMapping[category.iconName as IconKey] || (() => null);
  return <div>{Icon && <Icon className="text-2xl" />}</div>;
}
