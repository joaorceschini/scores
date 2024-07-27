export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  image_url: string;
  date: string;
};

export type Category = {
  id: string;
  user_id: string;
  name: string;
  date: string;
};

export type Game = {
  id: string;
  category_id: string;
  name: string;
  highscore: number;
  url: string;
  date: string;
};

export type Score = {
  id: string;
  game_id: string;
  score: number;
  description: string;
  date: string;
};

export type CategoriesTable = {
  id: string;
  name: string;
  date: string;
};

export type GamesTable = {
  id: string;
  name: string;
  highscore: string;
  url: string;
  date: string;
};

export type ScoresTable = {
  id: string;
  score: number;
  description: string;
  date: string;
};
