import Image from "next/image";
import { signOut } from "../../../auth";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { fetchUserSimpleDataByEmail } from "@/app/lib/data";
import { auth } from "@/auth";
import clsx from "clsx";

export default async function dashboardHeader() {
  const session = await auth();
  const user = await fetchUserSimpleDataByEmail(session?.user?.email || "a");

  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
      <div className="flex items-center gap-2">
        <a
          className="fixed left-0 top-0 flex w-full items-center justify-center border-b bg-gradient-to-b from-inherit pb-6 pt-8 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 lg:static lg:w-auto lg:rounded-md lg:border lg:bg-gray-200 lg:p-0 lg:pr-4 lg:gap-4 lg:bg-zinc-800/30"
          href="/profile"
        >
          <div
            className={clsx("hidden lg:block relative w-[50px] h-[50px]", {
              "bg-zinc-900 rounded-l-md": user.image_url === null,
            })}
          >
            {user.image_url && (
              <Image
                src={user.image_url}
                alt="avatar"
                className="rounded-l-md"
                layout={"fill"}
                objectFit={"cover"}
              />
            )}
          </div>
          {user.username}
        </a>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center p-3 transition-colors text-gray-400 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
            <ArrowRightStartOnRectangleIcon className="hidden w-6 lg:block" />
            <div className="lg:hidden">sign out</div>
          </button>
        </form>
      </div>
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-black via-black lg:static lg:size-auto lg:bg-none">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="/"
        >
          <Image
            src="/scores-logo-cyber.jpg"
            alt="scores logo"
            className="invert"
            width={52}
            height={52}
            priority
          />
        </a>
      </div>
    </div>
  );
}
