import Image from "next/image";

export default function dashboardHeader() {
  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <div className="flex items-center gap-2">
        <a
          className="fixed left-0 top-0 flex w-full items-center justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-0 lg:pr-4 gap-4 lg:dark:bg-zinc-800/30"
          href="/profile"
        >
          <div className="hidden lg:block relative w-[50px] h-[50px]">
            <Image
              src="/tylerdurden.jpg"
              alt="avatar"
              className="rounded-l-xl"
              layout={"fill"}
              objectFit={"cover"}
            />
          </div>
          <p>jces</p>
        </a>
      </div>
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="/"
        >
          <Image
            src="/scores-logo-cyber.jpg"
            alt="scores logo"
            className="dark:invert "
            width={54}
            height={54}
            priority
          />
        </a>
      </div>
    </div>
  );
}
