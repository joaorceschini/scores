const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    username: "jces",
    email: "jrvceschini@gmail.com",
    password: "123456",
    avatar: "https://github.com/joaorceschini.png",
  },
];

const categories = [
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    name: "aim400kg",
  },
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    name: "aimbooster",
  },
  {
    id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    name: "humanbenchmark",
  },
  {
    id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
    name: "nao sei o que nao sei o que la",
  },
  {
    id: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9",
    name: "corinthians",
  },
  {
    id: "13D07535-C59E-4157-A011-F8D2EF4E0CBB",
    name: "categoria 6",
  },
];

const games = [
  {
    id: "23D07535-C59E-4157-A011-F8D2EF4E0CBB",
    category_id: categories[0].id,
    name: "exact aim v2",
    highscore: 20300,
    link: "https://github.com/joaorceschini",
  },
  {
    id: "33D07535-C59E-4157-A011-F8D2EF4E0CBB",
    category_id: categories[1].id,
    name: "treino aimbooster nao sei oq",
    highscore: 12000,
    link: "https://github.com/joaorceschini",
  },
  {
    id: "43D07535-C59E-4157-A011-F8D2EF4E0CBB",
    category_id: categories[0].id,
    name: "haunted v2",
    highscore: 34000,
    link: "https://github.com/joaorceschini",
  },
  {
    id: "53D07535-C59E-4157-A011-F8D2EF4E0CBB",
    category_id: categories[2].id,
    name: "reaction time",
    highscore: 112,
    link: "https://humanbenchmark.com/tests/reactiontime",
  },
  {
    id: "63D07535-C59E-4157-A011-F8D2EF4E0CBB",
    category_id: categories[3].id,
    name: "sla",
    highscore: 104,
    link: "",
  },
  {
    id: "73D07535-C59E-4157-A011-F8D2EF4E0CBB",
    category_id: categories[4].id,
    name: "palmeiras",
    highscore: "51",
    link: "",
  },
  {
    id: "83D07535-C59E-4157-A011-F8D2EF4E0CBB",
    category_id: categories[5].id,
    name: "scores categoria 6",
    highscore: "6",
    link: "",
  },
];

const scores = [
  {
    game_id: games[0].id,
    score: 18000,
    description: "",
    date: "2024-07-17",
  },
  {
    game_id: games[0].id,
    score: 17000,
    description: "",
    date: "2024-07-16",
  },
  {
    game_id: games[1].id,
    score: 16000,
    description: "",
    date: "2024-07-15",
  },
  {
    game_id: games[2].id,
    score: 15000,
    description: "",
    date: "2024-07-14",
  },
  {
    game_id: games[3].id,
    score: 14000,
    description: "",
    date: "2024-07-13",
  },
  {
    game_id: games[4].id,
    score: 13000,
    description: "",
    date: "2024-07-12",
  },
  {
    game_id: games[5].id,
    score: 12000,
    description: "",
    date: "2024-07-11",
  },
  {
    game_id: games[6].id,
    score: 11000,
    description: "",
    date: "2024-07-10",
  },
  {
    game_id: games[1].id,
    score: 10000,
    description: "",
    date: "2024-07-09",
  },
];

export { users, categories, games, scores };
