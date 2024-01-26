<template>
  <section>
    <div class="mainContainer gap-4">
      <!-- <div class="coinBalance flex items-center gap-2 my-2">
        {{ coinBalance.toLocaleString("en-US") }}
        <img src="../assets/coins.svg" alt="" />
      </div> -->
      <div
        class="packs row flex gap-x-20 gap-y-10 justify-center items-center w-full flex-wrap"
      >
        <div
          class="pack w-1/4"
          v-for="pack in packs"
          :key="pack.name"
          :style="renderPackStyle(pack)"
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
          <div class="packPrice" :style="renderPriceStyle(pack)">
            <div class="coins flex items-center justify-center gap-2">
              {{ pack.cost.coins.toLocaleString("en-US") }}
              <img src="../assets/coins.svg" alt="" />
            </div>
            <UDivider
              label="OR"
              class="priceDivider"
              :ui="{ label: 'text-white-500 dark:text-white-400' }"
            />
            <div class="coins flex items-center justify-center gap-2">
              {{ pack.cost.points.toLocaleString("en-US") }}
              <img src="../assets/points.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <UModal
        v-model="isOpen"
        :fullscreen="playersPacked.length != 0 ? true : false"
      >
        <UCard
          :ui="{
            base: 'h-full flex flex-col',
            rounded: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            body: {
              base: 'grow',
            },
          }"
        >
          <template #header>
            <div
              :class="
                playersPacked.length != 0
                  ? 'flex items-center text-center justify-between'
                  : 'flex items-center text-center justify-center'
              "
            >
              <h3
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                {{ packOpened.name }}
              </h3>
              <UButton
                icon="i-heroicons-check-circle"
                size="md"
                color="primary"
                variant="soft"
                style="justify-content: center"
                label="Confirm"
                @click="closePack()"
                trailing
                v-if="playersPacked.length != 0"
              />
            </div>
          </template>
          <div class="modalContainer">
            <div
              class="packConfirm flex align-center gap-5 justify-center flex-col"
              v-if="playersPacked.length == 0"
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
                  :label="packOpened.cost.coins.toLocaleString('en-US')"
                  trailing
                  @click="openPack()"
                />
                <UButton
                  icon="i-heroicons-pencil-square"
                  size="md"
                  color="primary"
                  variant="soft"
                  :label="packOpened.cost.points.toLocaleString('en-US')"
                  @click="openPack()"
                  trailing
                />
              </div>
            </div>
            <div
              v-else
              class="flex row align-center justify-center gap-4 flex-col"
            >
              <div
                class="player gap-8 flex flex-wrap align-center justify-between"
              >
                <div
                  class="playerInfo text-center"
                  v-for="player in playersPacked"
                  :key="player.Name"
                >
                  <!-- {{ player.Name }}
                {{ player.overall }} -->
                  <Player :player="player" />
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </UModal>
      <UModal v-model="isPick" :fullscreen="false">
        <UCard
          :ui="{
            base: 'h-full flex flex-col',
            rounded: '',

            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            body: {
              base: 'grow',
            },
          }"
          class="modalCard p-0"
        >
          <template #header>
            <div
              :class="
                playersPacked.length != 0
                  ? 'flex items-center text-center justify-between'
                  : 'flex items-center text-center justify-center'
              "
            >
              <h3
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                {{ packOpened.name }}
              </h3>
              <UButton
                icon="i-heroicons-check-circle"
                size="md"
                color="primary"
                variant="soft"
                style="justify-content: center"
                label="Confirm"
                :disabled="confirmButtonDisabled"
                @click="updatePickPlayers()"
                trailing
                v-if="playersPacked.length != 0"
              />
            </div>
          </template>
          <div class="modalContainer">
            <div
              class="packConfirm flex align-center gap-5 justify-center p-4 flex-col"
              v-if="playersPacked.length == 0"
            >
              <div class="title text-center">
                Are you sure you want to open this player pick?
              </div>
              <div class="buttons flex align-center justify-center gap-4">
                <UButton
                  icon="i-heroicons-pencil-square"
                  size="md"
                  color="amber"
                  variant="soft"
                  :label="packOpened.cost.coins.toLocaleString('en-US')"
                  trailing
                  @click="openPack()"
                />
                <UButton
                  icon="i-heroicons-pencil-square"
                  size="md"
                  color="primary"
                  variant="soft"
                  :label="packOpened.cost.points.toLocaleString('en-US')"
                  @click="openPack()"
                  trailing
                />
              </div>
            </div>
            <div
              v-else
              class="flex row align-center justify-center gap-4 flex-col"
            >
              <div
                class="playerPick gap-0 flex flex-wrap align-center justify-between"
              >
                <div
                  :class="
                    playerPickSelect[index]
                      ? 'playerInfo p-4 text-center w-full gap-4 justify-between flex selected'
                      : 'playerInfo p-4 text-center w-full gap-4 justify-between flex'
                  "
                  v-for="(player, index) in playersPacked"
                  :key="player.Name"
                >
                  <div
                    @click="handlePick(player, index)"
                    class="flex items-center gap-4 justify-between w-full"
                  >
                    <UCheckbox
                      v-model="playerPickSelect[index]"
                      :disabled="isLocked(index)"
                      class="flex flex-row-reverse items-center gap-4 justify-between w-full"
                    >
                      <template #label>
                        <div class="playerCont flex items-center gap-4">
                          <PlayerPick :player="player" type="pick" />

                          <div class="overall gap-3">
                            OVR
                            <div class="playerOverall">
                              {{ player.overall }}
                            </div>
                          </div>
                          <div class="overall gap-3">
                            NAT
                            <div class="playerOverall">
                              <img
                                :src="
                                  player.flag ? player.flag : './england.svg'
                                "
                                style="width: 32px"
                                alt=""
                              />
                            </div>
                          </div>
                          <div class="overall gap-3">
                            CLUB
                            <div class="playerOverall">
                              <img
                                src="../assets/teams/real-madrid.svg"
                                style="width: 32px"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </template>
                    </UCheckbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </UModal>
    </div>
  </section>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");
</style>

<script>
import packs from "../utils/packs";
import players from "../utils/player_database2";
import { useUserStore } from "~/store/useUserStore";
import { supabase } from "../src/lib/supabaseClient";
export default {
  name: "packs",
  data() {
    return {
      packs: packs,
      players: players,
      isOpen: false,
      isPick: false,
      lock: null,
      playerPickSelect: [false, false, false],
      balanceModal: false,
      packOpened: {},
      user: {},
      coinBalance: 0,
      playersPacked: [],
      playerPicked: [],
    };
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    requestPack(pack) {
      pack.type == "pick" ? (this.isPick = true) : (this.isOpen = true);
      this.packOpened = pack;
      // console.log("pack: " + JSON.stringify(pack));df
    },
    closePack() {
      this.playersPacked = [];
      this.isOpen = false;
      this.isPick = false;
    },
    async openPack() {
      const toast = useToast();
      const userStore = useUserStore();

      let index = 0;
      if (this.coinBalance < this.packOpened.cost.coins) {
        toast.add({
          id: "update_downloaded",
          title: "You do not have enough coins to open this pack.",
          timeout: 5000,
        });

        return;
      }

      this.coinBalance -= parseInt(this.packOpened.cost.coins);
      userStore.updateUserBalance(this.coinBalance);

      for (let i = 0; i < this.packOpened.noOfPlayers; i++) {
        index = Math.floor(Math.random() * this.players.length);
        // console.log("index: " + index);
        if (this.packOpened.minRating) {
          if (
            this.players[index].overall >= this.packOpened.minRating &&
            !this.playersPacked.includes(this.players[index])
          ) {
            this.playersPacked.push(this.players[index]);
          } else {
            i--;
          }
        } else if (!this.playersPacked.includes(this.players[index])) {
          this.playersPacked.push(this.players[index]);
        } else {
          i--;
        }
      }
      if (!this.packOpened.type) {
        this.playersPacked = this.playersPacked.sort(
          (a, b) => b.overall - a.overall
        );
      }

      const { data, error } = await supabase
        .from("users")
        .update({ coinBalance: this.coinBalance })
        .eq("username", this.user.user_metadata.username)
        .select("");

      if (!this.packOpened.type) {
        this.updatePlayers();
      }

      // console.log("data", data);
      // console.log("players: ", this.playersPacked);
    },

    async updatePlayers() {
      const { data, error } = await supabase
        .from("players")
        .select("players")
        .eq("username", this.user.user_metadata.username)
        .single();

      // console.log("updatedPlayers", updatedPlayers);
      let updatedPlayers = [];
      if (!data.players) {
        for (let i = 0; i < this.playersPacked.length; i++) {
          updatedPlayers.push(this.playersPacked[i]);
        }
        updatedPlayers.forEach((item) => {
          item.count = 1;
        });
      } else {
        updatedPlayers = data.players;

        this.playersPacked.forEach((packedPlayer) => {
          // Check if the long_name exists in updatedPlayers
          const existingPlayerIndex = updatedPlayers.findIndex(
            (player) => player.long_name === packedPlayer.long_name
          );

          if (existingPlayerIndex !== -1) {
            // If the player exists, increment the count property
            updatedPlayers[existingPlayerIndex].count++;
          } else {
            // If the player does not exist, push it to updatedPlayers
            updatedPlayers.push({
              count: 1,
              ...packedPlayer,
            });
          }
        });
      }

      const { data2, error2 } = await supabase
        .from("players")
        .update({ players: updatedPlayers })
        .eq("username", this.user.user_metadata.username)
        .select("");
    },
    async updatePickPlayers() {
      this.closePack();
      const { data, error } = await supabase
        .from("players")
        .select("players")
        .eq("username", this.user.user_metadata.username)
        .single();

      // console.log("updatedPlayers", updatedPlayers);
      let updatedPlayers = [];
      if (!data.players) {
        for (let i = 0; i < this.playerPicked.length; i++) {
          updatedPlayers.push(this.playerPicked[i]);
        }
        updatedPlayers.forEach((item) => {
          item.count = 1;
        });
      } else {
        updatedPlayers = data.players;

        this.playerPicked.forEach((packedPlayer) => {
          // Check if the long_name exists in updatedPlayers
          const existingPlayerIndex = updatedPlayers.findIndex(
            (player) => player.long_name === packedPlayer.long_name
          );

          if (existingPlayerIndex !== -1) {
            // If the player exists, increment the count property
            updatedPlayers[existingPlayerIndex].count++;
          } else {
            // If the player does not exist, push it to updatedPlayers
            updatedPlayers.push({
              count: 1,
              ...packedPlayer,
            });
          }
        });
      }

      const { data2, error2 } = await supabase
        .from("players")
        .update({ players: updatedPlayers })
        .eq("username", this.user.user_metadata.username)
        .select("");
    },
    handlePick(player, index) {
      // this.playerPickSelect[index] = !this.playerPickSelect[index];

      // // Lock the other players
      // this.lock = this.playerPickSelect[index] ? null : index;
      this.playerPicked = [];
      this.playerPickSelect = this.playerPickSelect.map(() => false);

      // Toggle the checkbox state
      this.playerPickSelect[index] = true;

      // Update the lock state based on the selected checkbox
      this.lock = index;
      this.playerPicked.push(player);
    },
    isLocked(index) {
      // Check if the checkbox at the given index should be disabled
      return this.lock !== null && this.lock !== index;
    },
    async getUserData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user", user);
      this.user = user;
      const { data } = await supabase
        .from("users")
        .select("coinBalance")
        .eq("username", this.user.user_metadata.username);
      console.log("data", data);
      this.coinBalance = data[0].coinBalance;
    },
  },
  computed: {
    confirmButtonDisabled() {
      const selectedCount = this.playerPickSelect.filter(Boolean).length;
      return selectedCount !== 1;
    },
    renderPackStyle() {
      return (pack) => {
        if (
          pack &&
          pack.colors &&
          pack.colors.primary &&
          pack.colors.secondary
        ) {
          const primaryColor = pack.colors.primary;
          const secondaryColor = pack.colors.secondary;
          return {
            background: `linear-gradient(144deg, ${primaryColor} 10.35%, ${secondaryColor} 72.26%)`,
            filter: `drop-shadow(0px 1px 4.4px ${primaryColor})`,
          };
        } else {
          return {};
        }
      };
    },
    renderPriceStyle() {
      return (pack) => {
        if (
          pack &&
          pack.colors &&
          pack.colors.primary &&
          pack.colors.secondary
        ) {
          const primaryColor = pack.colors.primaryRGBA;
          return {
            background: `${primaryColor}`,
          };
        } else {
          return {};
        }
      };
    },
  },
};
</script>

<style scoped>
.mainContainer {
  padding: 20px;
}
.coinBalance {
  font-family: Poppins;
}
.pack:hover {
  filter: drop-shadow(0px 1px 8.4px #625fee);
  transform: translateY(-5px);
}
.pack {
  background: linear-gradient(
    144deg,
    #3f3e9e 10.35%,
    rgba(0, 0, 0, 0.571) 102.26%
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
.playerInfo:hover {
  background: #1a202d;
}
.playerInfo {
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
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

.selected {
  background: #0c1019 !important;
}
.player {
  padding: 20px;
}

.overall {
  border-radius: 0px 0px 20px 20px;
  /* background: rgba(0, 0, 0, 0.35); */
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px 10px;
  flex-direction: column;
  justify-content: space-between;
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
.playerOverall {
  font-size: 32px;
}
</style>
<style>
.priceDivider .border-solid {
  border-color: white !important;
}
.modalCard .grow.px-4.py-5.sm\:p-6 {
  padding: 0;
  overflow: hidden;
}
</style>
