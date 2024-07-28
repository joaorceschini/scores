import { fetchUserByEmail } from "../lib/data";
import { auth } from "@/auth";
import Header from "../ui/dashboard/header";
import Form from "../ui/profile/edit-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "profile",
};

export default async function Page() {
  const session = await auth();
  const user = await fetchUserByEmail(session?.user?.email || "a");

  return (
    <div className="flex min-h-screen flex-col items-center py-24 px-4 md:p-24 md:overflow-hidden">
      <Header />
      <div className="flex w-full max-w-5xl items-center md:overflow-y-auto md:mt-16 md:px-4">
        <main className="w-full py-4">
          <div className="flex w-full items-center">
            <h1 className="text-2xl font-mono">profile</h1>
          </div>
          <div className="mt-4">
            <Form user={user} />
          </div>
        </main>
      </div>
    </div>
  );
}
