"use client";

import Link from "next/link";
import { AtSymbolIcon, PlusIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useActionState } from "react";
import { Button } from "../button";
import { StateUserUpdate, updateUser } from "../../lib/actions";
import { QueryResultRow } from "@vercel/postgres";

export default function Form({ user }: { user: QueryResultRow }) {
  const initialState: StateUserUpdate = { message: null, errors: {} };
  const updateUserWithId = updateUser.bind(null, user.id);
  const [state, formAction] = useActionState(updateUserWithId, initialState);

  return (
    <form action={formAction}>
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="username" className="sr-only">
          username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="enter username"
          defaultValue={user.username}
          className="peer block w-full outline-1 rounded-md border border-gray-300 py-[9px] pl-10 text-sm placeholder:text-gray-500 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit"
          aria-describedby="username-error"
        />
        <PlusIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-100" />
      </div>
      <div id="username-error" aria-live="polite" aria-atomic="true">
        {state.errors?.username &&
          state.errors.username.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className="relative flex flex-1 flex-shrink-0 mt-2">
        <label htmlFor="email" className="sr-only">
          email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="enter email"
          defaultValue={user.email}
          className="peer block w-full outline-1 rounded-md border border-gray-300 py-[9px] pl-10 text-sm placeholder:text-gray-500 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit"
          aria-describedby="email-error"
        />
        <AtSymbolIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-100" />
      </div>
      <div id="email-error" aria-live="polite" aria-atomic="true">
        {state.errors?.email &&
          state.errors.email.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className="relative flex flex-1 flex-shrink-0 mt-2">
        <label htmlFor="image_url" className="sr-only">
          image url
        </label>
        <input
          id="image_url"
          name="image_url"
          type="text"
          placeholder="enter image url"
          defaultValue={user.image_url}
          className="peer block w-full outline-1 rounded-md border border-gray-300 py-[9px] pl-10 text-sm placeholder:text-gray-500 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit"
          aria-describedby="imageurl-error"
        />
        <LinkIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-100" />
      </div>
      <div id="imageurl-error" aria-live="polite" aria-atomic="true">
        {state.errors?.image_url &&
          state.errors.image_url.map((error: string) => (
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

      <div className="mt-6 flex justify-between">
        <div>
          <Link
            href="/profile/newpassword"
            className="text-sm transition-colors text-gray-400 hover:text-white"
          >
            change password
          </Link>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/dashboard`}
            className="flex h-10 items-center rounded-md bg-neutral-900 px-4 text-sm font-medium text-gray-500 transition-colors hover:opacity-95"
          >
            cancel
          </Link>
          <Button type="submit">edit</Button>
        </div>
      </div>
    </form>
  );
}
