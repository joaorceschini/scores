import { formatDateToLocal } from "../../../lib/utils";
import { fetchFilteredGames, fetchScoresByGameId } from "../../../lib/data";
import { UpdateGame, DeleteGame } from "../games/buttons";
import Link from "next/link";

export default async function GamesTable({
  query,
  currentPage,
  categoryId,
}: {
  query: string;
  currentPage: number;
  categoryId: string;
}) {
  const games = await fetchFilteredGames(query, currentPage, categoryId);

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
                  highscore
                </th>
                <th scope="col" className="px-4 py-3 font-normal">
                  date
                </th>
                <th scope="col" className="px-4 py-3 font-normal">
                  url
                </th>
                <th scope="col" className="relative py-1 pl-6 pr-3">
                  <span className="sr-only">edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="text-white">
              {games?.map(async (game) => {
                const scores = await fetchScoresByGameId(game.id);
                const highscore = Math.max(
                  ...scores.map((s) => Number(s.score)),
                );
                return (
                  <tr
                    key={game.id}
                    className="w-full text-sm border-b border-neutral-800 last-of-type:border-none hover:bg-neutral-950"
                  >
                    <td className="whitespace-nowrap">
                      <Link
                        href={`/dashboard/${categoryId}/games/${game.id}/scores`}
                        className="block w-full px-4 py-3"
                      >
                        {game.name}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap">
                      <Link
                        href={`/dashboard/${categoryId}/games/${game.id}/scores`}
                        className="block w-full px-4 py-3"
                      >
                        {highscore}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {formatDateToLocal(game.date)}
                    </td>
                    <td className="whitespace-nowrap">
                      {!game.url ? (
                        <></>
                      ) : (
                        <Link
                          href={game.url}
                          target="_blank"
                          className="block w-full px-4 py-3 transition-colors text-gray-400 hover:text-white"
                        >
                          url
                        </Link>
                      )}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3 text-gray-400">
                        <UpdateGame id={game.id} categoryId={categoryId} />
                        <DeleteGame id={game.id} categoryId={categoryId} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
