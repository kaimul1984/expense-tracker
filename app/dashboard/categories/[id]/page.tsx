import React from "react";

export default async function SingleCategory({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <div className="card">{id}</div>;
}
