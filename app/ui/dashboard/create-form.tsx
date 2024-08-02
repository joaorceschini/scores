"use client";

import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useActionState } from "react";
import { Button } from "../button";
import { createCategory, StateCategory } from "../../lib/actions";

export default function Form() {
  const initialState: StateCategory = { message: null, errors: {} };

  const [state, formAction] = useActionState(createCategory, initialState);

  return (
    <form action={formAction}>
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="name" className="sr-only">
          name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="enter category name"
          className="peer block w-full outline-1 rounded-md border border-gray-300 py-[9px] pl-10 text-sm placeholder:text-gray-500 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit"
          aria-describedby="name-error"
          autoFocus
        />
        <PlusIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-100" />
      </div>
      <div id="name-error" aria-live="polite" aria-atomic="true">
        {state.errors?.name &&
          state.errors.name.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
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
          href="/dashboard"
          className="flex h-10 items-center rounded-md bg-neutral-900 px-4 text-sm font-medium text-gray-500 transition-colors hover:opacity-95"
        >
          cancel
        </Link>
        <Button type="submit">create</Button>
      </div>
    </form>
  );
}
