import { currentUser } from "@clerk/nextjs/server";
import { Modal } from "./modal";
import { CategoryForm } from "@/components/CategoryForm";
import { getCategoryById } from "@/lib/actions/category.action";
import { Separator } from "@radix-ui/react-select";

export default async function CategoryModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const user = await currentUser();

  const userId = user?.id as string;

  const category = await getCategoryById(id);

  return (
    <Modal>
      <div className="w-full flex flex-col">
        <h3 className="text-xl">Update Category</h3>
        <div className="w-full border-b-2 py-2" />
        <CategoryForm
          type="update"
          category={category}
          categoryId={category._id}
        />
      </div>
    </Modal>
  );
}
