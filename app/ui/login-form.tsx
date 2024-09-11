"use client";

import { KeyIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import Link from "next/link";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
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
          className="peer block w-full outline-1 rounded-md border py-[9px] pl-10 text-sm placeholder:text-gray-500 bg-gradient-to-b backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit"
          aria-describedby="username-error"
          required
        />
        <UserCircleIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-100" />
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
          className="peer block w-full outline-1 rounded-md border py-[9px] pl-10 text-sm placeholder:text-gray-500 bg-gradient-to-b backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit"
          aria-describedby="password-error"
          required
          minLength={6}
        />
        <KeyIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-100" />
      </div>

      <div className="w-full mt-6 flex justify-end gap-2">
        <Button className="w-full" aria-disabled={isPending}>
          log in <ArrowRightIcon className="ml-auto h-5 w-5" />
        </Button>
      </div>
      <div className="flex items-end justify-between">
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
        <Link
          href="/register"
          className="text-center transition-colors text-gray-400 hover:text-white"
        >
          create account
        </Link>
      </div>
    </form>
  );
}
