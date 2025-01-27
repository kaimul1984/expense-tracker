import React from "react";
import { Modal } from "./modal";

export default async function SingleExpense({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <Modal>
      <>{id}</>
    </Modal>
  );
}
