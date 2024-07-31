import { sql } from "@vercel/postgres";
import { CategoriesTable, GamesTable, ScoresTable } from "./definitions";
import { auth } from "@/auth";

export async function fetchScoresByGameId(gameId: string) {
  const session = await auth();
  const user = await fetchUserId(session?.user?.email || "");

  try {
    const scores = await sql`
      SELECT scores.id, scores.score, scores.description, scores.date AT TIME ZONE 'UTC' AS date
      FROM scores
      WHERE
        scores.game_id = ${gameId} AND
        scores.user_id = ${user.id}
      ORDER BY scores.date ASC
    `;

    return scores.rows;
  } catch (error) {
    console.error("database error:", error);
    throw new Error("failed to fetch scores");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredCategories(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const session = await auth();
  const user = await fetchUserId(session?.user?.email || "");

  try {
    const filteredCategories = await sql<CategoriesTable>`
      SELECT 
        categories.id,
        categories.name,
        categories.date
      FROM categories
      WHERE
        categories.name ILIKE ${`%${query}%`} AND
        categories.user_id = ${user.id}
      ORDER BY categories.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return filteredCategories.rows;
  } catch (error) {
    console.error("database error:", error);
    throw new Error("failed to fetch filtered categories");
  }
}

export async function fetchCategoriesPages(query: string) {
  const session = await auth();
  const user = await fetchUserId(session?.user?.email || "");

  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM categories
      WHERE
        categories.name ILIKE ${`%${query}%`} AND
        categories.user_id = ${user.id}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("database error:", error);
    throw new Error("failed to fetch total number of categories");
  }
}

export async function fetchEqualNamesCategories(
  query: string,
  categoryId?: string,
) {
  const session = await auth();
  const user = await fetchUserId(session?.user?.email || "");

  if (categoryId) {
    try {
      const equalNames = await sql<CategoriesTable>`
      SELECT 
        categories.name
      FROM categories
      WHERE
       categories.name = ${query} AND
       categories.user_id = ${user.id} AND
       categories.id != ${categoryId}
    `;

      return equalNames.rows;
    } catch (error) {
      console.error("database error:", error);
      throw new Error("failed to fetch equal names");
    }
  } else {
    try {
      const equalNames = await sql<CategoriesTable>`
        SELECT 
          categories.name
          FROM categories
        WHERE
          categories.name = ${query} AND
          categories.user_id = ${user.id}
      `;

      return equalNames.rows;
    } catch (error) {
      console.error("database error:", error);
      throw new Error("failed to fetch equal names");
    }
  }
}

export async function fetchCategoryById(id: string) {
  const session = await auth();
  const user = await fetchUserId(session?.user?.email || "");

  try {
    const category = await sql`
      SELECT 
        categories.id,
        categories.user_id,
        categories.name,
        categories.date
      FROM categories
      WHERE 
        categories.id = ${id} AND
        categories.user_id = ${user.id}
    `;

    return category.rows[0];
  } catch (error) {
    console.error("database error:", error);
    throw new Error("failed to fetch category by id");
  }
}

export async function fetchGamesPages(query: string, categoryId: string) {
  const session = await auth();
  const user = await fetchUserId(session?.user?.email || "");

  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM games
      WHERE
        games.name ILIKE ${`%${query}%`} AND
        games.category_id = ${categoryId} AND 
        games.user_id = ${user.id}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("database error:", error);
    throw new Error("failed to fetch total number of games");
  }
}

export async function fetchFilteredGames(
  query: string,
  currentPage: number,
  categoryId: string,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const session = await auth();
  const user = await fetchUserId(session?.user?.email || "");

  try {
    const filteredGames = await sql<GamesTable>`
      SELECT 
        games.id,
        games.name,
        games.highscore,
        games.url,
        games.date
      FROM games
      WHERE
        games.name ILIKE ${`%${query}%`} AND
        games.category_id = ${categoryId} AND
        games.user_id = ${user.id}
      ORDER BY games.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return filteredGames.rows;
  } catch (error) {
    console.error("database error:", error);
    throw new Error("failed to fetch filtered games");
  }
}

export async function fetchEqualNamesGames(
  query: string,
  categoryId: string,
  gameId?: string,
) {
  const session = await auth();
  const user = await fetchUserId(session?.user?.email || "");

  if (gameId) {
    try {
      const equalNames = await sql<GamesTable>`
      SELECT 
        games.name
      FROM games
      WHERE
        games.name = ${query} AND
        games.category_id = ${categoryId} AND
        games.user_id = ${user.id} AND
        games.id != ${gameId}
    `;

      return equalNames.rows;
    } catch (error) {
      console.error("database error:", error);
      throw new Error("failed to fetch equal names");
    }
  } else {
    try {
      const equalNames = await sql<GamesTable>`
      SELECT 
        games.name
      FROM games
      WHERE
        games.name = ${query} AND
        games.category_id = ${categoryId} AND
        games.user_id = ${user.id} 
    `;

      return equalNames.rows;
    } catch (error) {
      console.error("database error:", error);
      throw new Error("failed to fetch equal names");
    }
  }
}

export async function fetchGameById(gameId: string, categoryId: string) {
  const session = await auth();
  const user = await fetchUserId(session?.user?.email || "");

  try {
    const game = await sql`
      SELECT 
        games.id,
        games.name,
        games.highscore,
        games.url
      FROM games
      WHERE 
        games.id = ${gameId} AND
        games.category_id = ${categoryId} AND
        games.user_id = ${user.id} 
    `;

    return game.rows[0];
  } catch (error) {
    console.error("database error:", error);
    throw new Error("failed to fetch game by id");
  }
}

export async function fetchFilteredScores(
  query: string,
  currentPage: number,
  categoryId: string,
  gameId: string,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const session = await auth();
  const user = await fetchUserId(session?.user?.email || "");

  try {
    const filteredScores = await sql<ScoresTable>`
      SELECT 
        scores.id,
        scores.score,
        scores.description,
        scores.date
      FROM scores
      WHERE
        scores.score::text ILIKE ${`%${query}%`} AND
        scores.game_id = ${gameId} AND
        scores.user_id = ${user.id}
      ORDER BY scores.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return filteredScores.rows;
  } catch (error) {
    console.error("database error:", error);
    throw new Error("failed to fetch filtered scores");
  }
}

export async function fetchScoresPages(query: string, gameId: string) {
  const session = await auth();
  const user = await fetchUserId(session?.user?.email || "");

  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM scores
      WHERE
        scores.score::text ILIKE ${`%${query}%`} AND
        scores.game_id = ${gameId} AND
        scores.user_id = ${user.id}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("database error:", error);
    throw new Error("failed to fetch total number of scores");
  }
}

export async function fetchScoreById(scoreId: string, gameId: string) {
  const session = await auth();
  const user = await fetchUserId(session?.user?.email || "");

  try {
    const score = await sql`
      SELECT 
        scores.id,
        scores.score,
        scores.description
      FROM scores
      WHERE 
        scores.id = ${scoreId} AND
        scores.game_id = ${gameId} AND
        scores.user_id = ${user.id}
    `;

    return score.rows[0];
  } catch (error) {
    console.error("database error:", error);
    throw new Error("failed to fetch score by id");
  }
}

export async function fetchMaxScoreById(scoreId: string, gameId: string) {
  const session = await auth();
  const user = await fetchUserId(session?.user?.email || "");

  try {
    const score = await sql`
      SELECT MAX(score) 
      FROM scores
      WHERE 
        scores.id != ${scoreId} AND
        scores.game_id = ${gameId} AND
        scores.user_id = ${user.id}
    `;

    return score.rows[0];
  } catch (error) {
    console.error("database error:", error);
    throw new Error("failed to fetch max score by id");
  }
}

export async function fetchUserByEmail(email: string) {
  try {
    const user = await sql`
      SELECT 
        users.id,
        users.username,
        users.email,
        users.image_url,
        users.date
      FROM users
      WHERE
        users.email = ${email}
    `;
    return user.rows[0];
  } catch (error) {
    console.error("database error:", error);
    throw new Error("failed to fetch user data");
  }
}

export async function fetchUserId(email: string) {
  try {
    const user = await sql`
      SELECT 
        users.id
      FROM users
      WHERE
        users.email = ${email}
    `;
    return user.rows[0];
  } catch (error) {
    console.error("database error:", error);
    throw new Error("failed to fetch user id");
  }
}

export async function fetchUserSimpleDataByEmail(email: string) {
  if (email === "a") {
    return {
      username: "-",
      image_url: "",
    };
  }
  try {
    const user = await sql`
      SELECT 
        users.username,
        users.image_url
      FROM users
      WHERE
        users.email = ${email}
    `;
    return user.rows[0];
  } catch (error) {
    console.error("database error:", error);
    throw new Error("failed to fetch user simple data");
  }
}

export async function fetchEqualNamesUsers(query: string, userId?: string) {
  if (userId) {
    try {
      const equalNames = await sql`
      SELECT 
        users.username
      FROM users
      WHERE
       users.username = ${query} AND
       users.id != ${userId}
    `;

      return equalNames.rows;
    } catch (error) {
      console.error("database error:", error);
      throw new Error("failed to fetch equal usernames");
    }
  } else {
    try {
      const equalNames = await sql`
      SELECT 
        users.username
      FROM users
      WHERE
       users.username = ${query}
    `;

      return equalNames.rows;
    } catch (error) {
      console.error("database error:", error);
      throw new Error("failed to fetch equal usernames");
    }
  }
}

export async function fetchEqualEmailsUsers(query: string, userId?: string) {
  if (userId) {
    try {
      const equalEmails = await sql`
      SELECT 
        users.email
      FROM users
      WHERE
       users.email = ${query} AND
       users.id != ${userId}
    `;

      return equalEmails.rows;
    } catch (error) {
      console.error("database error:", error);
      throw new Error("failed to fetch equal emails");
    }
  } else {
    try {
      const equalEmails = await sql`
      SELECT 
        users.email
      FROM users
      WHERE
       users.email = ${query}
    `;

      return equalEmails.rows;
    } catch (error) {
      console.error("database error:", error);
      throw new Error("failed to fetch equal emails");
    }
  }
}
