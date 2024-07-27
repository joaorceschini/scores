import { fetchCategoryById } from "@/app/lib/data";
import Breadcrumbs from "../../../../ui/dashboard/breadcrumbs";
import Form from "../../../../ui/dashboard/games/create-form";

export default async function Page({
  params,
}: {
  params: { categoryId: string };
}) {
  const id = params.categoryId;
  const category = await fetchCategoryById(id);

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
          },
          {
            label: "create",
            href: `/dashboard/${id}/games/create`,
            active: true,
          },
        ]}
      />
      <div className="mt-4 md:mt-8">
        <Form categoryId={id} />
      </div>
    </main>
  );
}
