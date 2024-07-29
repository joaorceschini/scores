import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteCategory } from "../../lib/actions";

export function CreateCategory() {
  return (
    <Link
      href="/dashboard/create"
      className="flex h-10 items-center rounded-md border border-neutral-800 text-gray-300 px-4 text-sm font-medium transition-colors hover:bg-neutral-950"
    >
      <span className="hidden md:block">create category</span>{" "}
      <PlusIcon className="h-5 md:ml-4 text-white" />
    </Link>
  );
}

export function UpdateCategory({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/${id}/edit`}
      className="transition-colors hover:text-white"
    >
      edit
    </Link>
  );
}

export function DeleteCategory({ id }: { id: string }) {
  const deleteCategoryWithId = deleteCategory.bind(null, id);
  return (
    <>
      <form action={deleteCategoryWithId}>
        <button className="transition-colors hover:text-white">del</button>
      </form>
    </>
  );
}
