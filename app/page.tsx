import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 md:overflow-hidden">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <div className="flex items-center gap-2">
          <a
            className="fixed left-0 top-0 flex w-full items-center justify-center border-b bg-gradient-to-b from-inherit pb-6 pt-8 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 lg:static lg:w-auto lg:rounded-md lg:border lg:bg-gray-200 lg:p-0 lg:pr-4 lg:gap-4 lg:bg-zinc-800/30"
            href="/login"
          >
            <div className="hidden lg:block relative w-[50px] h-[50px] bg-zinc-900 rounded-l-md"></div>
            login
          </a>
        </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-black via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="/"
          >
            <Image
              src="/scores-logo-cyber.jpg"
              alt="scores logo"
              className="invert "
              width={52}
              height={52}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center">
        <Image
          src="/scores-logo-cyber-2.jpg"
          alt="logo 2"
          className="invert z-[-1] absolute -right-5 -top-8 opacity-25"
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
    </div>
  );
}
