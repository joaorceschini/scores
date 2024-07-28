import Search from "../../../ui/search";
import { fetchCategoryById, fetchGamesPages } from "../../../lib/data";
import { Suspense } from "react";
import Table from "../../../ui/dashboard/games/table";
import Pagination from "../../../ui/dashboard/pagination";
import Breadcrumbs from "../../../ui/dashboard/breadcrumbs";
import { CreateGame } from "@/app/ui/dashboard/games/buttons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "games",
};

export default async function Page({
  searchParams,
  params,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
  params: { categoryId: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const id = params.categoryId;

  const category = await fetchCategoryById(id);
  const totalPages = await fetchGamesPages(query, id);

  if (!category) {
    return <h1>this category does not exists</h1>;
  }

  return (
    <main className="w-full py-4">
      <Breadcrumbs
        breadcrumbs={[
          { label: "categories", href: "/dashboard" },
          {
            label: `${category.name}`,
            href: `/dashboard/${id}/games`,
            active: true,
          },
        ]}
      />

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="search games..." />
        <CreateGame categoryId={id} />
      </div>
      <Suspense key={query + currentPage}>
        <Table query={query} currentPage={currentPage} categoryId={id} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
