import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "flex h-10 items-center rounded-md border border-neutral-800 text-gray-300 px-4 text-sm font-medium transition-colors hover:bg-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-white aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
}
