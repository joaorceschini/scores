import Header from "../ui/dashboard/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center py-24 px-4 md:p-24 md:overflow-hidden">
      <Header />
      <div className="flex w-full max-w-5xl items-center md:overflow-y-auto md:mt-16 md:px-4">
        {children}
      </div>
    </div>
  );
}
