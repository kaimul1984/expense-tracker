import React from "react";

export default async function SingleCategory({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return <div className="card">{slug}</div>;
}
