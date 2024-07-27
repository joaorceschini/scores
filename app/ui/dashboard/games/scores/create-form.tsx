"use client";

import Link from "next/link";
import { PlusIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useActionState } from "react";
import { Button } from "../../../button";
import { createScore, State } from "../../../../lib/actions";

export default function Form({
  categoryId,
  gameId,
}: {
  categoryId: string;
  gameId: string;
}) {
  const initialState: State = { message: null, errors: {} };
  const createScoreWithId = createScore.bind(null, categoryId, gameId);
  const [state, formAction] = useActionState(createScoreWithId, initialState);

  return (
    <form action={formAction}>
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          score
        </label>
        <input
          id="score"
          name="score"
          type="number"
          placeholder="enter score"
          className="peer block w-full outline-1 rounded-md border border-gray-300 py-[9px] pl-10 text-sm placeholder:text-gray-500 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          aria-describedby="name-error"
        />
        <PlusIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-100" />
      </div>
      <div id="name-error" aria-live="polite" aria-atomic="true">
        {state.errors?.score &&
          state.errors.score.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className="relative flex flex-1 flex-shrink-0 mt-2">
        <label htmlFor="search" className="sr-only">
          description
        </label>
        <input
          id="description"
          name="description"
          type="text"
          placeholder="enter score description (optional)"
          className="peer block w-full outline-1 rounded-md border border-gray-300 py-[9px] pl-10 text-sm placeholder:text-gray-500 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit"
          aria-describedby="description-error"
        />
        <ChatBubbleLeftIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-100" />
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
        <Button type="submit">create</Button>
      </div>
    </form>
  );
}
