import React from "react";

export default async function SingleExpense({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <div>expense: {id}</div>;
}
