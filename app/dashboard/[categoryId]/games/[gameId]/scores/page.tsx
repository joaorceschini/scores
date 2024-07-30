import Search from "../../../../../ui/search";
import {
  fetchCategoryById,
  fetchGameById,
  fetchScoresByGameId,
  fetchScoresPages,
} from "../../../../../lib/data";
import { Suspense } from "react";
import Table from "../../../../../ui/dashboard/games/scores/table";
import Pagination from "../../../../../ui/dashboard/pagination";
import Breadcrumbs from "../../../../../ui/dashboard/breadcrumbs";
import { CreateScore } from "../../../../../ui/dashboard/games/scores/buttons";
import { Metadata } from "next";
import Link from "next/link";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export const metadata: Metadata = {
  title: "scores",
};

export default async function Page({
  searchParams,
  params,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
  params: { categoryId: string; gameId: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const categoryId = params.categoryId;
  const gameId = params.gameId;

  const category = await fetchCategoryById(categoryId);
  const game = await fetchGameById(gameId, categoryId);
  const scores = await fetchScoresByGameId(gameId);
  const totalPages = await fetchScoresPages(query, gameId);

  if (!category) {
    return <h1>this category does not exists</h1>;
  }

  if (!game) {
    return <h1>this game does not exists</h1>;
  }

  return (
    <main className="w-full py-4">
      <Breadcrumbs
        breadcrumbs={[
          { label: "categories", href: "/dashboard" },
          {
            label: `${category.name}`,
            href: `/dashboard/${categoryId}/games`,
          },
          {
            label: `${game.name}`,
            href: `/dashboard/${categoryId}/games/${gameId}/scores`,
            active: true,
          },
        ]}
      />

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="search scores..." />
        <CreateScore categoryId={categoryId} gameId={gameId} />
      </div>
      <Suspense key={query + currentPage}>
        <Table
          query={query}
          currentPage={currentPage}
          categoryId={categoryId}
          gameId={gameId}
        />
      </Suspense>
      <div className="my-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
      {!scores.length ? (
        <></>
      ) : (
        <div className="flex items-center justify-between">
          <Link
            href={`/dashboard/${categoryId}/games/${gameId}/scores/stats`}
            className="w-full flex h-10 items-center justify-between gap-2 mr-2 rounded-md border border-neutral-800 text-gray-300 px-4 text-sm font-medium transition-colors hover:bg-neutral-950"
          >
            <ChartBarIcon className="h-5 text-white" />
            <span className="hidden md:block">stats</span>{" "}
          </Link>
          <Image
            src="/scores-sword.jpg"
            alt="sword"
            className="dark:invert rotate-90"
            height={50}
            width={50}
          />
        </div>
      )}
    </main>
  );
}
