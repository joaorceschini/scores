import Breadcrumbs from "../../ui/dashboard/breadcrumbs";
import Form from "../../ui/dashboard/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "create",
};

export default async function Page() {
  return (
    <main className="w-full py-4">
      <Breadcrumbs
        breadcrumbs={[
          { label: "categories", href: "/dashboard" },
          {
            label: "create",
            href: "/dashboard/create",
            active: true,
          },
        ]}
      />
      <div className="mt-4 md:mt-8">
        <Form />
      </div>
    </main>
  );
}
