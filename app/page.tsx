import React from "react";
import Link from "next/link";
import { FaChevronRight, FaCompressArrowsAlt } from "react-icons/fa";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-sky-800">
      <div className="w-[95%] bg-sky-900 max-w-[1420px] p-4 mt-4 h-20 rounded-3xl flex items-center justify-center gap-4">
        <FaCompressArrowsAlt size={25} color="#fff" />
        <h1 className="text-4xl text-white font-bold text-left">
          The Expense Tracker
        </h1>
      </div>
      <div className="w-[95%] bg-sky-900 max-w-[1420px] min-h-[800px] rounded-3xl m-auto flex flex-wrap justify-center">
        <div className="flex-1 flex flex-col  px-20 items-center justify-center">
          <div>
            <h2 className="text-white font-bold text-3xl">
              Welcome to The Expense Tracker
            </h2>
            <p className="my-8 w-[400px] text-white">
              This is ideal expense tracker where you can track your daily
              expense and make balance with your income.
            </p>

            <Link
              href="/dashboard"
              className="bg-white rounded-md text-xl flex items-center gap-4 w-max px-4 py-2"
            >
              Sign In
              <FaChevronRight />
            </Link>
          </div>
        </div>
        <div className="flex-1 p-4 flex items-center justify-center px-20">
          <div>
            <Image
              src="/hero-desktop.png"
              alt="pic"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
