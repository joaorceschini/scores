export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Game = {
  id: string;
  category_id: string;
  name: string;
  highscore: number;
  link: string;
};

export type Score = {
  id: string;
  game_id: string;
  score: number;
  description: string;
  date: string;
};
