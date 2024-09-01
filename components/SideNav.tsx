import Link from "next/link";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { FaSignOutAlt } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { SignOutButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function SideNav() {
  const user = await currentUser();
  return (
    <div className=" flex h-full flex-col px-3 py-4 md:px-2 bg-gray-100">
      <Link
        className=" mb-2 flex h-20 items-end justify-start rounded-md bg-sky-900 p-4 md:h-40"
        href="/"
      >
        <div className="w-full text-white md:w-40">
          <Logo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

        <div className="lg:flex flex-col gap-8 hidden">
          <span className="flex items-center gap-4 border-y-2">
            <CiSettings />
            Account
          </span>
          <div className="flex items-center gap-4">
            {/* <UserButton /> */}
            {user && (
              <Image
                src={user.imageUrl}
                alt="profileImg"
                width={30}
                height={30}
                className="rounded-full"
              />
            )}
            {user && (
              <span className="text-sm">
                {user?.primaryEmailAddress?.emailAddress}
              </span>
            )}
          </div>
          <SignOutButton>
            <button className="flex items-center gap-4">
              <FaSignOutAlt className="w-6" />
              Sign out
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}
