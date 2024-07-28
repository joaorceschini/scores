import { fetchCategoryById, fetchGameById } from "../../../../../../lib/data";
import Breadcrumbs from "../../../../../../ui/dashboard/breadcrumbs";
import Form from "../../../../../../ui/dashboard/games/scores/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "create",
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
          },
          {
            label: `create`,
            href: `/dashboard/${categoryId}/games/${gameId}/scores`,
            active: true,
          },
        ]}
      />
      <div className="mt-4 md:mt-8">
        <Form categoryId={categoryId} gameId={gameId} />
      </div>
    </main>
  );
}
