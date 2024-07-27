import LoginForm from "@/app/ui/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none lg:mb-2">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="/"
          >
            <Image
              src="/scores-logo-cyber.jpg"
              alt="scores logo"
              className="dark:invert "
              width={52}
              height={52}
              priority
            />
          </a>
        </div>{" "}
        <Image
          src="https://github.com/joaorceschini.png"
          alt="scores logo"
          width={52}
          height={52}
          priority
        />
        <LoginForm />
      </div>
    </main>
  );
}
