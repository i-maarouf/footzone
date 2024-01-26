const packs = [
  {
    name: "FootZone Premium Pack",
    cost: {
      coins: 100000,
      points: 2000,
    },
    desc: "Contains 24 Rare Gold Players",
    noOfPlayers: 24,
    colors: {
      primary: "#C93833",
      primaryRGBA: "rgba(201, 56, 51, 0.37)",
      secondary: "rgba(37,42,157,0.34)",
    },
  },

  {
    name: "FootZone Pack",
    cost: {
      coins: 10000,
      points: 250,
    },
    desc: "Contains 10 Rare Gold Players",
    noOfPlayers: 10,
    colors: {
      primary: "#3F3E9E",
      primaryRGBA: "rgba(54, 53, 140, 0.48)",
      secondary: "rgba(0,0,0,0.34)",
    },
  },
  {
    name: "FootZone Essentials Pack",
    cost: {
      coins: 50000,
      points: 1000,
    },
    desc: "Contains 15 Rare Gold Players",
    noOfPlayers: 15,
    colors: {
      primary: "#269790",
      primaryRGBA: "rgba(38, 151, 144, 0.48)",
      secondary: "rgba(54,53,140,0.34)",
    },
  },
  {
    name: "FootZone Ultimate Pack",
    cost: {
      coins: 200000,
      points: 3000,
    },
    desc: "Contains 50 Rare Gold Players",
    noOfPlayers: 50,
    colors: {
      primary: "#900000",
      primaryRGBA: "rgba(144, 0, 0, 0.48)",
      secondary: "rgba(0,0,0,0.55)",
    },
  },
  {
    name: "FootZone 83x10 Pack",
    cost: {
      coins: 250000,
      points: 3500,
    },
    desc: "Contains 10 Players rated 83 or higher",
    noOfPlayers: 10,
    minRating: 83,
    colors: {
      primary: "#e9c46a",
      primaryRGBA: "rgba(233, 196, 106, 0.37)",

      secondary: "rgba(0,0,0,0.55)",
    },
  },
  {
    name: "FootZone 87x5 Pack",
    cost: {
      coins: 500000,
      points: 5500,
    },
    desc: "Contains 5 Players rated 87 or higher",
    noOfPlayers: 5,
    minRating: 87,
    colors: {
      primary: "#ef233c",
      primaryRGBA: "rgba(144, 0, 0, 0.37)",

      secondary: "rgba(0,0,0,0.55)",
    },
  },
  {
    name: "FootZone 81+ Player Pick",
    cost: {
      coins: 30000,
      points: 1000,
    },
    desc: "Pick 1 of 3 players rated 81 or higher",
    noOfPlayers: 3,
    minRating: 81,
    type: "pick",
    colors: {
      primary: "#ef233c",
      primaryRGBA: "rgba(144, 0, 0, 0.37)",

      secondary: "rgba(0,0,0,0.55)",
    },
  },
  {
    name: "FootZone 85+ Player Pick",
    cost: {
      coins: 90000,
      points: 1000,
    },
    desc: "Pick 1 of 4 players rated 85 or higher",
    noOfPlayers: 4,
    minRating: 85,
    type: "pick",
    colors: {
      primary: "#ef233c",
      primaryRGBA: "rgba(144, 0, 0, 0.37)",

      secondary: "rgba(0,0,0,0.55)",
    },
  },
];
export default packs;
