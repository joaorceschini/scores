"use client";

import Link from "next/link";
import { PlusIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useActionState } from "react";
import { Button } from "../../../button";
import { StateScore, updateScore } from "../../../../lib/actions";
import { QueryResultRow } from "@vercel/postgres";

export default function Form({
  score,
  categoryId,
  gameId,
}: {
  score: QueryResultRow;
  categoryId: string;
  gameId: string;
}) {
  const initialState: StateScore = { message: null, errors: {} };
  const updateScoreWithId = updateScore.bind(
    null,
    score.id,
    categoryId,
    gameId,
  );
  const [state, formAction] = useActionState(updateScoreWithId, initialState);

  return (
    <form action={formAction}>
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="score" className="sr-only">
          score
        </label>
        <input
          id="score"
          name="score"
          type="number"
          placeholder="enter game score"
          defaultValue={score.score}
          className="peer block w-full outline-1 rounded-md border border-gray-300 py-[9px] pl-10 text-sm placeholder:text-gray-500 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          aria-describedby="score-error"
        />
        <PlusIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-100" />
      </div>
      <div id="score-error" aria-live="polite" aria-atomic="true">
        {state.errors?.score &&
          state.errors.score.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className="relative flex flex-1 flex-shrink-0 mt-2">
        <label htmlFor="description" className="sr-only">
          url
        </label>
        <input
          id="description"
          name="description"
          type="text"
          placeholder="enter game description (optional)"
          defaultValue={score.description}
          className="peer block w-full outline-1 rounded-md border border-gray-300 py-[9px] pl-10 text-sm placeholder:text-gray-500 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit"
          aria-describedby="description-error"
        />
        <LinkIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-100" />
      </div>
      <div id="missing-error" aria-live="polite" aria-atomic="true">
        {state.message && (
          <p className="mt-2 text-sm text-red-500" key={state.message}>
            {state.message}
          </p>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Link
          href={`/dashboard/${categoryId}/games/${gameId}/scores`}
          className="flex h-10 items-center rounded-md border border-neutral-800 px-4 text-sm font-medium text-gray-500 transition-colors hover:bg-neutral-900"
        >
          cancel
        </Link>
        <Button type="submit">edit</Button>
      </div>
    </form>
  );
}
