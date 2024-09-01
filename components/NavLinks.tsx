"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import nabItems from "@/assets/data";
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {nabItems.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.label}
            href={link.path}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-4 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-700 text-slate-50": pathname === link.path,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.label}</p>
          </Link>
        );
      })}
    </>
  );
}
