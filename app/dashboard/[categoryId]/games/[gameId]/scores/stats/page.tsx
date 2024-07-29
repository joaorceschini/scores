import {
  fetchCategoryById,
  fetchGameById,
  fetchScoresByGameId,
} from "../../../../../../lib/data";
import Breadcrumbs from "../../../../../../ui/dashboard/breadcrumbs";
import { Metadata } from "next";
import Image from "next/image";
import ScoresChart from "@/app/ui/dashboard/games/scores/stats/chart";

export const metadata: Metadata = {
  title: "stats",
};

export default async function Page({
  params,
}: {
  params: { categoryId: string; gameId: string };
}) {
  const categoryId = params.categoryId;
  const gameId = params.gameId;

  const category = await fetchCategoryById(categoryId);
  const game = await fetchGameById(gameId, categoryId);
  const scores = await fetchScoresByGameId(gameId);

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
      <ScoresChart scores={scores} />
    </main>
  );
}
