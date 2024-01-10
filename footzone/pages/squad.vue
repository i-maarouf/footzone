<template>
  <section>
    <div class="mainContainer p-4 gap-5 flex flex-col">
      <div class="playersContainer flex w-full flex-wrap justify-between gap-4">
        <div class="player" v-for="player in players" :key="player.player_id">
          <Player :player="player" />
        </div>
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
      this.players.sort((a, b) => b.overall - a.overall);
      console.log("data", this.players);
      // this.userPlayers= data
    },
  },
};
</script>

<style></style>
