<template>
  <UChip :text="player.count" size="3xl" :show="player.count > 1" inset>
    <div class="playerCard">
      <div class="playerInfo">
        <div class="playerName">
          {{ player.short_name }}
        </div>
        <div class="playerPos">
          {{ player.player_positions }}
        </div>
      </div>
      <img
        :src="player.player_image ? player.player_image : playerImage"
        alt=""
        srcset=""
        class="playerImage"
      />
      <div class="overall">
        <img src="../assets/teams/real-madrid.svg" style="width: 22px" alt="" />
        <div class="playerOverall">
          {{ player.overall }}
        </div>
        <img
          :src="player.flag ? player.flag : './england.svg'"
          style="width: 22px"
          alt=""
        />
      </div>

      <!-- <UButton icon="i-heroicons-inbox" color="gray" /> -->
    </div>
  </UChip>
</template>

<script>
export default {
  name: "Player",
  props: {
    player: Object,
  },
  data() {
    return {
      playerImage: "",
    };
  },
  mounted() {
    console.log("Player passed is: ", this.player);
    if (!this.player.player_image) {
      const playerId = this.player.player_url.match(/player\/(\d+)/)[1];
      const imageUrl = `https://cdn.sofifa.net/players/${playerId.slice(
        0,
        3
      )}/${playerId.slice(3)}/24_240.png`;
      this.playerImage = imageUrl;
    }
  },
  methods: {},
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");
</style>
<style scoped>
.playerCard {
  border-radius: 20px;
  background: linear-gradient(149deg, #36358c 0%, #72255c 89.16%);
  height: 270px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  animation: fadeIn 0.5s ease-in-out;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.playerImage {
  max-width: 167px;
}
.overall {
  border-radius: 0px 0px 20px 20px;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px 10px;

  justify-content: space-between;
}
.playerInfo {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  align-items: center;
  padding: 10px 0 0;

  justify-content: center;
}
.playerOverall {
  color: #fff;
  font-family: Poppins;
  font-size: 26px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}
.playerCount {
  position: absolute;
  top: 0px;
  right: 0px;
}
.playerPos {
  color: #fff;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}
.playerName {
  color: #fff;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
