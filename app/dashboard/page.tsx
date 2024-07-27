import Search from "../ui/search";
import { CreateCategory } from "../ui/dashboard/buttons";
import { fetchCategoriesPages } from "../lib/data";
import { Suspense } from "react";
import Table from "../ui/dashboard/table";
import Pagination from "../ui/dashboard/pagination";
import { auth } from "@/auth";
import Image from "next/image";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCategoriesPages(query);
  const session = await auth();

  return (
    <main className="w-full py-4">
      <div className="flex w-full items-center">
        <h1 className="text-2xl font-mono">categories</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="search categories..." />
        <CreateCategory />
      </div>
      <Suspense key={query + currentPage}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
