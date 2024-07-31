import { formatDateToLocal } from "../../../../lib/utils";
import { fetchFilteredScores } from "../../../../lib/data";
import Link from "next/link";
import { UpdateScore, DeleteScore } from "./buttons";

export default async function scoresTable({
  query,
  currentPage,
  categoryId,
  gameId,
}: {
  query: string;
  currentPage: number;
  categoryId: string;
  gameId: string;
}) {
  const scores = await fetchFilteredScores(
    query,
    currentPage,
    categoryId,
    gameId,
  );

  console.log(scores[0].date);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="border border-neutral-800 rounded-md">
          <table className="min-w-full text-gray-400 text-sm table-auto">
            <thead className="text-left text-sm font-normal">
              <tr className="border-b border-neutral-800">
                <th scope="col" className="px-4 py-3 font-normal">
                  score
                </th>
                <th scope="col" className="px-4 py-3 font-normal">
                  description
                </th>
                <th scope="col" className="px-4 py-3 font-normal">
                  date
                </th>
                <th scope="col" className="relative py-1 pl-6 pr-3">
                  <span className="sr-only">edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="text-white font-mono">
              {scores?.map((score) => (
                <tr
                  key={score.id}
                  className="w-full dark:border-neutral-800 text-sm border-b border-neutral-800 last-of-type:border-none hover:bg-neutral-950"
                >
                  <td className="whitespace-nowrap px-4 py-3">{score.score}</td>
                  <td className="whitespace-nowrap w-full px-4 py-3">
                    {!score.description ? <></> : score.description}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {formatDateToLocal(score.date)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3 text-gray-400">
                      <UpdateScore
                        id={score.id}
                        categoryId={categoryId}
                        gameId={gameId}
                      />
                      <DeleteScore
                        id={score.id}
                        categoryId={categoryId}
                        gameId={gameId}
                      />
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
