import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { users, categories, games, scores } from "../lib/placeholder-data";

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      username VARCHAR(16) NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      image_url VARCHAR(255),
      date DATE NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, username, email, password, image_url, date)
        VALUES (${user.id}, ${user.username}, ${user.email}, ${hashedPassword}, ${user.image_url}, ${user.date})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedCategories() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS categories (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, 
      name TEXT NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedCategories = await Promise.all(
    categories.map(
      (category) => client.sql`
        INSERT INTO categories (id, user_id, name, date)
        VALUES (${category.id}, ${category.user_id}, ${category.name}, ${category.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCategories;
}

async function seedGames() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS games (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, 
      category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
      name TEXT NOT NULL, 
      highscore BIGINT,
      url VARCHAR(255),
      date DATE NOT NULL
    );
  `;

  const insertedGames = await Promise.all(
    games.map(
      (game) => client.sql`
        INSERT INTO games (id, user_id, category_id, name, highscore, url, date)
        VALUES (${game.id}, ${game.user_id}, ${game.category_id}, ${game.name}, ${game.highscore}, ${game.url}, ${game.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedGames;
}

async function seedScores() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS scores (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, 
      game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
      score BIGINT NOT NULL,
      description TEXT,
      date DATE NOT NULL
    );
  `;

  const insertedScores = await Promise.all(
    scores.map(
      (score) => client.sql`
        INSERT INTO scores (user_id, game_id, score, description, date)
        VALUES (${score.user_id}, ${score.game_id}, ${score.score}, ${score.description}, ${score.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedScores;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedCategories();
    await seedGames();
    await seedScores();
    await client.sql`COMMIT`;

    return Response.json({ message: "database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
