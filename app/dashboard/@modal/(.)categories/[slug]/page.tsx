import { Modal } from "./modal";

export default async function CategoryModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return (
    <Modal>
      <div className="card">{slug}</div>
    </Modal>
  );
}
