import players from "./utils/player_database2";

// Function to generate player_image URL based on player_url
function generatePlayerImageUrl(playerUrl) {
  const playerId = playerUrl.match(/player\/(\d+)/)[1];
  const imageUrl = `https://cdn.sofifa.net/players/${playerId.slice(
    0,
    3
  )}/${playerId.slice(3)}/24_240.png`;
  return imageUrl;
}

// Create a new array with added player_image property
const playersWithImages = players.map((player) => {
  if (!player.player_image) {
    // Clone the original object to avoid modifying it directly
    const newPlayer = {
      ...player,
      player_image: generatePlayerImageUrl(player.player_url),
    };
    return newPlayer;
  } else {
    // If player_image is already present, return the original object
    return player;
  }
});

// Now, 'playersWithImages' array contains all objects with the added player_image property

// If you want to see the updated array, you can log it
console.log(playersWithImages);
