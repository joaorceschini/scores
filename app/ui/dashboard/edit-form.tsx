"use client";

import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useActionState } from "react";
import { Button } from "../button";
import { StateCategory, updateCategory } from "../../lib/actions";
import { QueryResultRow } from "@vercel/postgres";

export default function Form({ category }: { category: QueryResultRow }) {
  const initialState: StateCategory = { message: null, errors: {} };
  const updateCategoryWithId = updateCategory.bind(null, category.id);
  const [state, formAction] = useActionState(
    updateCategoryWithId,
    initialState,
  );

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
          defaultValue={category.name}
          className="peer block w-full outline-1 rounded-md border py-[9px] pl-10 text-sm placeholder:text-gray-500 bg-gradient-to-b backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit"
          aria-describedby="name-error"
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
        <Button type="submit">edit</Button>
      </div>
    </form>
  );
}
