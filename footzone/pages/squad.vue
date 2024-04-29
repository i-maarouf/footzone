<template>
  <section>
    <div class="mainContainer p-4 gap-5 flex flex-col">
      <div
        class="playersContainer grid 2xl:grid-cols-7 xl:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-10 w-full place-items-center"
      >
        <div class="player" v-for="player in players" :key="player.player_id">
          <Player :player="player" />
        </div>
      </div>

      <div
        class="flex items-center space-x-4 justify-between"
        v-if="playersLoading"
      >
        <USkeleton class="h-72 w-52" style="border-radius: 20px" />
        <USkeleton class="h-72 w-52" style="border-radius: 20px" />
        <USkeleton class="h-72 w-52" style="border-radius: 20px" />
        <USkeleton class="h-72 w-52" style="border-radius: 20px" />
        <USkeleton class="h-72 w-52" style="border-radius: 20px" />
        <USkeleton class="h-72 w-52" style="border-radius: 20px" />
        <USkeleton class="h-72 w-52" style="border-radius: 20px" />
      </div>

      <UPagination v-model="page" :page-count="5" :total="players.length" />
    </div>
  </section>
</template>

<script>
import { supabase } from "../src/lib/supabaseClient";
import { useUserStore } from "~/store/useUserStore";

export default {
  name: "squad",
  data() {
    return {
      user: {},
      page: 1,
      playersLoading: true,
      players: [],
    };
  },

  mounted() {
    this.getUserData().then(() => {
      this.getUserPlayers();
    });
  },

  methods: {
    async getUserData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      this.user = user;
      // const userStore = useUserStore();

      // const user = useUserStore().user;
      console.log("user", user);
      // console.log("user", JSON.stringify(user));
    },
    async getUserPlayers() {
      console.log("user from function2", this.user);

      const { data, error } = await supabase
        .from("players")
        .select("players")
        .eq("username", this.user.user_metadata.username);
      this.players = data[0].players;
      this.playersLoading = false;
      this.players.sort((a, b) => b.overall - a.overall);
      console.log("data", this.players);
      // this.userPlayers= data
    },
  },
};
</script>

<style></style>
