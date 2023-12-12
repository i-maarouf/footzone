<template>
  <section>
    <div class="mainContainer">
      <div class="packs row flex gap-10 justify-between items-center w-full">
        <div
          class="pack w-1/4"
          v-for="pack in packs"
          :key="pack.name"
          @click="requestPack(pack)"
        >
          <div class="packInfo">
            <div class="packTitle">
              {{ pack.name }}
            </div>
            <div class="packDesc">
              {{ pack.desc }}
            </div>
          </div>
          <div class="packPrice">
            <div class="coins flex items-center justify-center gap-2">
              {{ pack.cost.coins }}
              <img src="../assets/coins.svg" alt="" />
            </div>
            <UDivider
              label="OR"
              class="priceDivider"
              :ui="{ label: 'text-white-500 dark:text-white-400' }"
            />
            <div class="coins flex items-center justify-center gap-2">
              {{ pack.cost.points }}
              <img src="../assets/points.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <UModal v-model="isOpen">
        <div class="p-4">
          <div
            class="packConfirm flex flex-col align-center gap-5 justify-center"
            v-if="this.playersPacked.length == 0"
          >
            <div class="title text-center">
              Are you sure you want to open this pack?
            </div>
            <div class="buttons flex align-center justify-center gap-4">
              <UButton
                icon="i-heroicons-pencil-square"
                size="md"
                color="amber"
                variant="soft"
                :label="packOpened.cost.coins"
                trailing
                @click="openPack()"
              />
              <UButton
                icon="i-heroicons-pencil-square"
                size="md"
                color="primary"
                variant="soft"
                :label="packOpened.cost.points"
                @click="openPack()"
                trailing
              />
            </div>
          </div>
          <div
            v-else
            class="flex row align-center justify-center gap-4 flex-col"
          >
            <div class="player">
              <div
                class="playerInfo text-center"
                v-for="player in playersPacked"
                :key="player.name"
              >
                {{ player.Name }}
                {{ player.Overall }}
              </div>
            </div>
            <UButton
              icon="i-heroicons-pencil-square"
              size="md"
              color="primary"
              variant="soft"
              style="justify-content: center"
              label="Save"
              @click="closePack()"
              trailing
            />
          </div>
        </div>
      </UModal>
    </div>
  </section>
</template>

<script>
import packs from "../utils/packs";
import players from "../utils/players_database";
export default {
  name: "packs",
  data() {
    return {
      packs: packs,
      players: players,
      isOpen: false,
      packOpened: {},
      playersPacked: [],
    };
  },
  methods: {
    requestPack(pack) {
      this.isOpen = true;
      this.packOpened = pack;
      // console.log("pack: " + JSON.stringify(pack));df
    },
    closePack() {
      this.playersPacked = [];
      this.isOpen = false;
    },
    openPack() {
      let index = 0;
      for (let i = 0; i < this.packOpened.noOfPlayers; i++) {
        index = Math.floor(Math.random() * this.players.length);
        console.log("index: " + index);
        this.playersPacked.push(this.players[index]);
      }
      this.playersPacked = this.playersPacked.sort(
        (a, b) => b.Overall - a.Overall
      );
      console.log("players: " + JSON.stringify(this.playersPacked));
    },
  },
};
</script>

<style scoped>
.mainContainer {
  padding: 20px;
}
.pack:hover {
  filter: drop-shadow(0px 1px 8.4px #625fee);
  transform: translateY(-5px);
}
.pack {
  background: linear-gradient(
    144deg,
    #3f3e9e 10.35%,
    rgba(0, 0, 0, 0.94) 102.26%
  );
  padding: 20px;
  transition: all 0.25s ease-in-out;
  border-radius: 15px;
  max-width: 300px;
  filter: drop-shadow(0px 1px 4.4px #36358c);
  cursor: pointer;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}
.packDesc {
  color: #c0c1d6;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  text-align: center;
  font-weight: 400;
  line-height: normal;
}
.title {
  color: #fff;
  font-family: Poppins;
  font-size: 18px;
  /* text-transform: capitalize; */
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: center;
}
.packTitle {
  color: #fff;
  font-family: Poppins;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
}
.packPrice {
  color: #fff;
  font-family: Poppins;
  font-size: 28px;
  font-style: italic;
  text-align: center;
  font-weight: 700;
  border-radius: 10px;
  background: rgba(54, 53, 140, 0.48);
  padding: 10px;
  line-height: normal;
  display: flex;
  width: 100%;
  flex-direction: column;
}
</style>
<style>
.priceDivider .border-solid {
  border-color: white !important;
}
</style>
