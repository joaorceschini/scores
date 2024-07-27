const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    username: "jces",
    email: "jrvceschini@gmail.com",
    password: "123456",
    image_url: "https://github.com/joaorceschini.png",
    date: "2024-05-01",
  },
];

const categories = [
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    user_id: users[0].id,
    name: "aim400kg",
    date: "2024-07-02",
  },
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    user_id: users[0].id,
    name: "aimbooster",
    date: "2024-07-01",
  },
  {
    id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    user_id: users[0].id,
    name: "humanbenchmark",
    date: "2024-06-30",
  },
  {
    id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
    user_id: users[0].id,
    name: "nao sei o que nao sei o que la",
    date: "2024-06-29",
  },
  {
    id: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9",
    user_id: users[0].id,
    name: "corinthians",
    date: "2024-06-28",
  },
  {
    id: "13D07535-C59E-4157-A011-F8D2EF4E0CBB",
    user_id: users[0].id,
    name: "categoria 6",
    date: "2024-06-27",
  },
];

const games = [
  {
    id: "23D07535-C59E-4157-A011-F8D2EF4E0CBB",
    user_id: users[0].id,
    category_id: categories[0].id,
    name: "exact aim v2",
    highscore: 20300,
    url: "https://github.com/joaorceschini",
    date: "2024-07-09",
  },
  {
    id: "33D07535-C59E-4157-A011-F8D2EF4E0CBB",
    user_id: users[0].id,
    category_id: categories[1].id,
    name: "treino aimbooster nao sei oq",
    highscore: 12000,
    url: "https://github.com/joaorceschini",
    date: "2024-07-08",
  },
  {
    id: "43D07535-C59E-4157-A011-F8D2EF4E0CBB",
    user_id: users[0].id,
    category_id: categories[0].id,
    name: "haunted v2",
    highscore: 34000,
    url: "https://github.com/joaorceschini",
    date: "2024-07-07",
  },
  {
    id: "53D07535-C59E-4157-A011-F8D2EF4E0CBB",
    user_id: users[0].id,
    category_id: categories[2].id,
    name: "reaction time",
    highscore: 112,
    url: "https://humanbenchmark.com/tests/reactiontime",
    date: "2024-07-06",
  },
  {
    id: "63D07535-C59E-4157-A011-F8D2EF4E0CBB",
    user_id: users[0].id,
    category_id: categories[3].id,
    name: "sla",
    highscore: 104,
    url: "",
    date: "2024-07-05",
  },
  {
    id: "73D07535-C59E-4157-A011-F8D2EF4E0CBB",
    user_id: users[0].id,
    category_id: categories[4].id,
    name: "palmeiras",
    highscore: 51,
    url: "",
    date: "2024-07-04",
  },
  {
    id: "83D07535-C59E-4157-A011-F8D2EF4E0CBB",
    user_id: users[0].id,
    category_id: categories[5].id,
    name: "scores categoria 6",
    highscore: 6,
    url: "",
    date: "2024-07-03",
  },
];

const scores = [
  {
    user_id: users[0].id,
    game_id: games[0].id,
    score: 18000,
    description: "",
    date: "2024-07-17",
  },
  {
    user_id: users[0].id,
    game_id: games[0].id,
    score: 17000,
    description: "",
    date: "2024-07-16",
  },
  {
    user_id: users[0].id,
    game_id: games[1].id,
    score: 16000,
    description: "",
    date: "2024-07-15",
  },
  {
    user_id: users[0].id,
    game_id: games[2].id,
    score: 15000,
    description: "",
    date: "2024-07-14",
  },
  {
    user_id: users[0].id,
    game_id: games[3].id,
    score: 14000,
    description: "",
    date: "2024-07-13",
  },
  {
    user_id: users[0].id,
    game_id: games[4].id,
    score: 13000,
    description: "",
    date: "2024-07-12",
  },
  {
    user_id: users[0].id,
    game_id: games[5].id,
    score: 12000,
    description: "",
    date: "2024-07-11",
  },
  {
    user_id: users[0].id,
    game_id: games[6].id,
    score: 11000,
    description: "",
    date: "2024-07-10",
  },
  {
    user_id: users[0].id,
    game_id: games[1].id,
    score: 10000,
    description: "",
    date: "2024-07-10",
  },
];

export { users, categories, games, scores };
