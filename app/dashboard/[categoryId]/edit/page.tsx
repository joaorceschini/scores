import { fetchCategoryById } from "@/app/lib/data";
import Breadcrumbs from "../../../ui/dashboard/breadcrumbs";
import Form from "../../../ui/dashboard/edit-form";

export default async function Page({
  params,
}: {
  params: { categoryId: string };
}) {
  const id = params.categoryId;
  const [category] = await Promise.all([fetchCategoryById(id)]);

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
            href: `/dashboard`,
          },
          {
            label: "edit",
            href: `/dashboard/${id}/edit`,
            active: true,
          },
        ]}
      />
      <div className="mt-4 md:mt-8">
        <Form category={category} />
      </div>
    </main>
  );
}
