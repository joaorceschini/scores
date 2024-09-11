import { formatDateToLocal } from "../../lib/utils";
import { fetchFilteredCategories } from "../../lib/data";
import { UpdateCategory, DeleteCategory } from "./buttons";
import Link from "next/link";

export default async function CategoriesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const categories = await fetchFilteredCategories(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="border border-neutral-800 rounded-md">
          <table className="min-w-full text-gray-400 text-sm table-auto">
            <thead className="text-left text-sm font-normal">
              <tr className="border-b border-neutral-800">
                <th scope="col" className="px-4 py-3 font-normal">
                  name
                </th>
                <th scope="col" className="px-4 py-3 font-normal">
                  date
                </th>
                <th scope="col" className="relative py-1 pl-6 pr-3">
                  <span className="sr-only">edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="text-white">
              {categories?.map((category) => (
                <tr
                  key={category.id}
                  className="w-full text-sm border-b border-neutral-800 last-of-type:border-none hover:bg-neutral-950"
                >
                  <td className="whitespace-nowrap">
                    <Link
                      href={`/dashboard/${category.id}/games`}
                      className="block w-full px-4 py-3"
                    >
                      {category.name}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {formatDateToLocal(category.date)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3 text-gray-400">
                      <UpdateCategory id={category.id} />
                      <DeleteCategory id={category.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
