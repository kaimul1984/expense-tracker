import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

export default function UserBtn() {
  return (
    <SignedIn>
      <UserButton />
    </SignedIn>
  );
}
