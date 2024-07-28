"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import { useActionState } from "react";
import { createUser, StateUser } from "@/app/lib/actions";
import Link from "next/link";

export default function RegisterForm() {
  const initialState: StateUser = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    createUser,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="username" className="sr-only">
          username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="enter username"
          className="peer block w-full outline-1 rounded-md border border-gray-300 py-[9px] pl-10 text-sm placeholder:text-gray-500 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit"
          aria-describedby="username-error"
          required
        />
        <UserCircleIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-100" />
      </div>
      <div id="name-error" aria-live="polite" aria-atomic="true">
        {state.errors?.username &&
          state.errors.username.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="email" className="sr-only">
          email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="enter email"
          className="peer block w-full outline-1 rounded-md border border-gray-300 py-[9px] pl-10 text-sm placeholder:text-gray-500 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit"
          aria-describedby="email-error"
          required
        />
        <AtSymbolIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-100" />
      </div>
      <div id="name-error" aria-live="polite" aria-atomic="true">
        {state.errors?.email &&
          state.errors.email.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="password" className="sr-only">
          password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="enter password"
          className="peer block w-full outline-1 rounded-md border border-gray-300 py-[9px] pl-10 text-sm placeholder:text-gray-500 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit"
          aria-describedby="password-error"
          required
          minLength={6}
        />
        <KeyIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-100" />
      </div>
      <div id="name-error" aria-live="polite" aria-atomic="true">
        {state.errors?.password &&
          state.errors.password.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div className="w-full mt-6 flex justify-end gap-2">
        <Button className="w-full" aria-disabled={isPending}>
          register <ArrowRightIcon className="ml-auto h-5 w-5" />
        </Button>
      </div>
      <div className="flex items-end justify-between">
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.message && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state.message}</p>
            </>
          )}
        </div>
        <Link
          href="/login"
          className="text-center transition-colors text-gray-400 hover:text-white"
        >
          login
        </Link>
      </div>
    </form>
  );
}
