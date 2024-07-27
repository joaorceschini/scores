import { fetchCategoryById, fetchGameById } from "@/app/lib/data";
import Breadcrumbs from "../../../../../ui/dashboard/breadcrumbs";
import Form from "../../../../../ui/dashboard/games/edit-form";

export default async function Page({
  params,
}: {
  params: { categoryId: string; gameId: string };
}) {
  const categoryId = params.categoryId;
  const gameId = params.gameId;

  const [game] = await Promise.all([fetchGameById(gameId, categoryId)]);
  const category = await fetchCategoryById(categoryId);

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
            href: `/dashboard/${categoryId}/games`,
          },
          {
            label: "edit",
            href: `/dashboard/${categoryId}/games/${gameId}/edit`,
            active: true,
          },
        ]}
      />
      <div className="mt-4 md:mt-8">
        <Form game={game} categoryId={categoryId} />
      </div>
    </main>
  );
}
