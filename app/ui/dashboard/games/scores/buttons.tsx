import { deleteScore } from "../../../../lib/actions";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateScore({
  categoryId,
  gameId,
}: {
  categoryId: string;
  gameId: string;
}) {
  return (
    <Link
      href={`/dashboard/${categoryId}/games/${gameId}/scores/create`}
      className="flex h-10 items-center rounded-md bg-gray-400 px-4 text-sm font-medium text-black transition-colors hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600"
    >
      <span className="hidden md:block">create score</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateScore({
  id,
  categoryId,
  gameId,
}: {
  id: string;
  categoryId: string;
  gameId: string;
}) {
  return (
    <Link
      href={`/dashboard/${categoryId}/games/${gameId}/scores/${id}/edit`}
      className="transition-colors hover:text-white"
    >
      edit
    </Link>
  );
}

export function DeleteScore({
  id,
  categoryId,
  gameId,
}: {
  id: string;
  categoryId: string;
  gameId: string;
}) {
  const deleteScoreWithId = deleteScore.bind(null, id, categoryId, gameId);
  return (
    <>
      <form action={deleteScoreWithId}>
        <button className="transition-colors hover:text-white">del</button>
      </form>
    </>
  );
}