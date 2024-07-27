import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteGame } from "../../../lib/actions";

export function CreateGame({ categoryId }: { categoryId: string }) {
  return (
    <Link
      href={`/dashboard/${categoryId}/games/create`}
      className="flex h-10 items-center rounded-md bg-gray-400 px-4 text-sm font-medium text-black transition-colors hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600"
    >
      <span className="hidden md:block">create game</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateGame({
  id,
  categoryId,
}: {
  id: string;
  categoryId: string;
}) {
  return (
    <Link
      href={`/dashboard/${categoryId}/games/${id}/edit`}
      className="transition-colors hover:text-white"
    >
      edit
    </Link>
  );
}

export function DeleteGame({
  id,
  categoryId,
}: {
  id: string;
  categoryId: string;
}) {
  const deleteGameWithId = deleteGame.bind(null, id, categoryId);
  return (
    <>
      <form action={deleteGameWithId}>
        <button className="transition-colors hover:text-white">del</button>
      </form>
    </>
  );
}
