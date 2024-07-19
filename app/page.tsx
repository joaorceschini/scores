import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <a
          className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
          href="/login"
        >
          login
        </a>
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

      <div className="relative flex place-items-center">
        <Image
          src="/scores-logo-cyber-2.jpg"
          alt="logo 2"
          className="dark:invert z-[-1] absolute -right-5 -top-8 opacity-25"
          width={100}
          height={100}
          priority
        />
        <div className="text-center">
          <h2 className="mb-3 text-2xl font-semibold">scores</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            app to save scores
          </p>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}
