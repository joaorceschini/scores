"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  fetchEqualNamesCategories,
  fetchEqualNamesGames,
  fetchEqualNamesUsers,
  fetchEqualEmailsUsers,
  fetchUserId,
  fetchUserByEmail,
  fetchGameById,
  fetchScoreById,
  fetchMaxScoreById,
  fetchUserSimpleDataByEmail,
} from "./data";
import { signIn } from "../../auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import { auth } from "@/auth";
import { signOut } from "../../auth";

const user_id = "410544b2-4001-4271-9855-fec4b6a6442a";

export type State = {
  errors?: {
    name?: string[];
    url?: string[];
    username?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  name: z
    .string({
      required_error: "required_error",
    })
    .min(1, { message: "enter a name" }),
  date: z.string(),
});

const CreateCategory = FormSchema.omit({
  id: true,
  date: true,
});

export async function createCategory(prevState: State, formData: FormData) {
  const validatedFields = CreateCategory.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "missing fields: failed do create category",
    };
  }

  const session = await auth();
  const user = await fetchUserId(session?.user?.email || "");

  const { name } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  const names = await fetchEqualNamesCategories(name);

  if (names.length) {
    return {
      message: "database error: there is already a category with that name",
    };
  }

  try {
    await sql`
      INSERT INTO categories (user_id, name, date)
      VALUES (${user.id}, ${name}, ${date})
    `;
  } catch (error) {
    return {
      message: "database error: failed to create category",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

const UpdateCategory = FormSchema.omit({ id: true, date: true });

export async function updateCategory(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateCategory.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "missing fields: failed do update category",
    };
  }

  const { name } = validatedFields.data;
  const names = await fetchEqualNamesCategories(name, id);

  if (names.length) {
    return {
      message: "database error: there is already a category with that name",
    };
  }

  try {
    await sql`
      UPDATE categories
      SET name = ${name} 
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: "database error: failed to update category",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteCategory(id: string) {
  try {
    await sql`
      DELETE FROM categories WHERE id = ${id}
    `;
    revalidatePath("/dashboard");
    return {
      message: "deleted category",
    };
  } catch (error) {
    return {
      message: "database error: failed to delete category",
    };
  }
}

const GameFormSchema = z.object({
  id: z.string(),
  name: z
    .string({
      required_error: "required_error",
    })
    .min(1, { message: "enter a name" }),
  url: z.string(),
  date: z.string(),
});

const CreateGame = GameFormSchema.omit({
  id: true,
  date: true,
});

export async function createGame(
  categoryId: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = CreateGame.safeParse({
    name: formData.get("name"),
    url: formData.get("url"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "missing fields: failed do create game",
    };
  }

  const session = await auth();
  const user = await fetchUserId(session?.user?.email || "");

  const { name, url } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  const names = await fetchEqualNamesGames(name, categoryId);

  if (names.length) {
    return {
      message: "database error: there is already a game with that name",
    };
  }

  try {
    await sql`
      INSERT INTO games (user_id, category_id, name, url, date)
      VALUES (${user.id}, ${categoryId}, ${name}, ${url}, ${date});
    `;
  } catch (error) {
    return {
      message: "database error: failed to create game",
    };
  }

  revalidatePath(`/dashboard/${categoryId}/games`);
  redirect(`/dashboard/${categoryId}/games`);
}

const UpdateGame = GameFormSchema.omit({ id: true, date: true });

export async function updateGame(
  id: string,
  categoryId: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateGame.safeParse({
    name: formData.get("name"),
    url: formData.get("url"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "missing fields: failed do update game",
    };
  }

  const { name, url } = validatedFields.data;
  const names = await fetchEqualNamesGames(name, categoryId, id);

  if (names.length) {
    return {
      message: "database error: there is already a game with that name",
    };
  }

  try {
    await sql`
      UPDATE games
      SET name = ${name}, url = ${url} 
      WHERE 
        id = ${id} AND
        games.category_id = ${categoryId}
    `;
  } catch (error) {
    return {
      message: "database error: failed to update game",
    };
  }

  revalidatePath(`/dashboard/${categoryId}/games`);
  redirect(`/dashboard/${categoryId}/games`);
}

export async function deleteGame(id: string, categoryId: string) {
  try {
    await sql`
      DELETE FROM games WHERE id = ${id};
    `;
    revalidatePath(`/dashboard/${categoryId}/games`);
    return {
      message: "deleted game",
    };
  } catch (error) {
    return {
      message: "database error: failed to delete game",
    };
  }
}

const ScoreFormSchema = z.object({
  id: z.string(),
  score: z
    .string({
      required_error: "required_error",
    })
    .min(1, { message: "enter a score" }),
  description: z.string(),
  date: z.string(),
});

const CreateScore = ScoreFormSchema.omit({
  id: true,
  date: true,
});

export async function createScore(
  categoryId: string,
  gameId: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = CreateScore.safeParse({
    score: formData.get("score"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "missing fields: failed do create score",
    };
  }

  const session = await auth();
  const user = await fetchUserId(session?.user?.email || "");

  const { score, description } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  const game = await fetchGameById(gameId, categoryId);

  if (
    game.highscore == undefined ||
    game.highscore == null ||
    score > game.highscore
  ) {
    try {
      await sql`
        UPDATE games
        SET highscore = ${score} 
        WHERE 
          id = ${gameId} AND
          games.category_id = ${categoryId}

    `;
    } catch (error) {
      return {
        message: "database error: failed to update highscore",
      };
    }
  }

  try {
    await sql`
      INSERT INTO scores (user_id, game_id, score, description, date)
      VALUES (${user.id}, ${gameId}, ${score}, ${description}, ${date});
    `;
  } catch (error) {
    return {
      message: "database error: failed to create score",
    };
  }

  revalidatePath(`/dashboard/${categoryId}/games/${gameId}/scores`);
  redirect(`/dashboard/${categoryId}/games/${gameId}/scores`);
}

const UpdateScore = ScoreFormSchema.omit({ id: true, date: true });

export async function updateScore(
  id: string,
  categoryId: string,
  gameId: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateScore.safeParse({
    score: formData.get("score"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "missing fields: failed do update score",
    };
  }

  const { score, description } = validatedFields.data;

  const game = await fetchGameById(gameId, categoryId);

  if (game.highscore == null || score > game.highscore) {
    try {
      await sql`
        UPDATE games
        SET highscore = ${score} 
        WHERE 
          id = ${gameId} AND
          games.category_id = ${categoryId}

    `;
    } catch (error) {
      return {
        message: "database error: failed to update highscore",
      };
    }
  }

  try {
    await sql`
      UPDATE scores
      SET score = ${score}, description = ${description} 
      WHERE 
        id = ${id} AND
        scores.game_id = ${gameId}
    `;
  } catch (error) {
    return {
      message: "database error: failed to update score",
    };
  }

  revalidatePath(`/dashboard/${categoryId}/games/${gameId}/scores`);
  redirect(`/dashboard/${categoryId}/games/${gameId}/scores`);
}

export async function deleteScore(
  id: string,
  categoryId: string,
  gameId: string,
) {
  const game = await fetchGameById(gameId, categoryId);
  const score = await fetchScoreById(id, gameId);

  if (score.score >= game.highscore) {
    const maxscore = await fetchMaxScoreById(id, gameId);

    try {
      await sql`
        UPDATE games
        SET highscore = ${maxscore.max} 
        WHERE 
          id = ${gameId} AND
          games.category_id = ${categoryId}

    `;
    } catch (error) {
      return {
        message: "database error: failed to update highscore",
      };
    }
  }

  try {
    await sql`
      DELETE FROM scores WHERE id = ${id}
    `;
    revalidatePath(`/dashboard/${categoryId}/games/${gameId}/scores`);
    return {
      message: "deleted score",
    };
  } catch (error) {
    return {
      message: "database error: failed to delete score",
    };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "invalid credentials";
        default:
          return "something went wrong";
      }
    }
    throw error;
  }
}

const UserFormSchema = z.object({
  id: z.string(),
  username: z
    .string({
      required_error: "required_error",
    })
    .min(3, { message: "enter a username" })
    .max(16, { message: "username must be between 3 and 16 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "password must be longer than 6 characters" }),
  image_url: z.string().url(),
  date: z.string(),
});

const CreateUser = UserFormSchema.omit({
  id: true,
  date: true,
  image_url: true,
});

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "missing fields: failed do create user",
    };
  }

  const { username, email, password } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  const usernames = await fetchEqualNamesUsers(username);
  const emails = await fetchEqualEmailsUsers(email);

  const hashedPassword = await bcrypt.hash(password, 10);

  if (usernames.length) {
    return {
      message: "database error: there is already a user with that username",
    };
  }
  if (emails.length) {
    return {
      message: "database error: there is already a user with that email",
    };
  }

  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
      INSERT INTO users (id, username, email, password, date)
      VALUES (uuid_generate_v4(), ${username}, ${email}, ${hashedPassword}, ${date})
    `;
  } catch (error) {
    return {
      message: "database error: failed to create user",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

const UpdateUser = UserFormSchema.omit({
  id: true,
  password: true,
  date: true,
});

export async function updateUser(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateUser.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    image_url: formData.get("image_url"),
  });

  const session = await auth();

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "missing fields: failed do update user",
    };
  }

  const { username, email, image_url } = validatedFields.data;

  const usernames = await fetchEqualNamesUsers(username, id);
  const emails = await fetchEqualEmailsUsers(email, id);

  if (usernames.length) {
    return {
      message: "database error: there is already a user with that username",
    };
  }
  if (emails.length) {
    return {
      message: "database error: there is already a user with that email",
    };
  }

  try {
    await sql`
      UPDATE users
      SET username = ${username}, email = ${email}, image_url = ${image_url}
      WHERE 
        id = ${id}
    `;
  } catch (error) {
    return {
      message: "database error: failed to update user",
    };
  }

  if (email != session?.user?.email) {
    await signOut();
  }

  revalidatePath(`/dashboard`);
  redirect(`/dashboard`);
}

const UserNewPasswordFormSchema = z.object({
  id: z.string(),
  password: z
    .string()
    .min(6, { message: "password must be longer than 6 characters" }),
  date: z.string(),
});

const UpdateUserNewPassword = UserNewPasswordFormSchema.omit({
  id: true,
  date: true,
});

export async function updateUserNewPassword(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateUserNewPassword.safeParse({
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "missing fields: failed do update user new password",
    };
  }

  const { password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
      UPDATE users
      SET password = ${hashedPassword}
      WHERE 
        id = ${id}
    `;
  } catch (error) {
    return {
      message: "database error: failed to update user new password",
    };
  }

  revalidatePath(`/dashboard`);
  redirect(`/dashboard`);
}
