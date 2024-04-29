<template>
  <div class="mainContainer p-4 gap-5 flex flex-col items-center">
    <div class="container w-full tableContainer">
      <UTable :rows="table" :columns="columns" :loading="table.length == 0">
        <template #row-data="{ index }">
          <div
            :class="
              index == 0
                ? 'flex items-center gap-2 subtleBG'
                : 'flex items-center gap-2 '
            "
          >
            <span>{{ index + 1 }}</span>
          </div>
        </template>
        <template #position-data="{ index }">
          <div
            :class="
              index == 0
                ? 'flex items-center gap-2 subtleBG'
                : 'flex items-center gap-2 '
            "
          >
            <span>{{ index + 1 }}</span>
          </div>
        </template>
        <template #name-data="{ row }">
          <div class="flex items-center gap-2">
            <img :src="row.crest" alt="" style="width: 32px" />
            <span>{{ row.name }}</span>
          </div>
        </template>
        <template #crest-data="{ row }">
          <div class="flex items-center gap-2">
            <img :src="row.crest" alt="" style="width: 32px" />
            <span>{{ row.name }}</span>
          </div>
        </template>
        <template #points-data="{ row }">
          <div class="flex items-center gap-2">
            <span class="points">{{ row.points }}</span>
          </div>
        </template>
      </UTable>
    </div>
  </div>
</template>

<script>
import { supabase } from "../src/lib/supabaseClient";
import { useUserStore } from "~/store/useUserStore";

export default {
  name: "Standings",
  data() {
    return {
      table: [],
      columns: [
        {
          key: "position",
          label: "Position",
        },
        {
          key: "name",
          label: "Club",
        },
        {
          key: "matchesPlayed",
          label: "Games Played",
        },
        {
          key: "matchesWon",
          label: "Won",
        },

        {
          key: "matchesDrawn",
          label: "Draw",
        },
        {
          key: "matchesLost",
          label: "Lost",
        },
        {
          key: "goalsScored",
          label: "Goals Scored",
        },
        {
          key: "goalsConceded",
          label: "Goals Conceded",
        },
        {
          key: "goalDifference",
          label: "Goal Difference",
        },
        {
          key: "points",
          label: "Points",
          direction: "desc",
          // sortable: true,
        },
        // {
        //   key: "crest",
        //   label: "Points",
        // },
      ],
    };
  },

  mounted() {
    this.getUserData().then(() => {
      this.getLeagueStandings();
    });
  },
  methods: {
    async getUserData() {
      // this.loading = true;
      const { data, error } = await supabase.from("users").select();

      if (data) console.log("data", data);
    },
    async getLeagueStandings() {
      const userStore = useUserStore();

      const { data, error } = await supabase
        .from("standings")
        .select("standings")
        .eq("username", userStore.user.user_metadata.username);

      if (data) {
        this.table = data[0].standings;
        // this.table.sort((a, b) => b.points - a.points);
        this.table.sort((a, b) => {
          if (a.points !== b.points) {
            return b.points - a.points; // Sort by points
          } else if (a.goalDifference !== b.goalDifference) {
            return b.goalDifference - a.goalDifference; // Sort by goal difference
          } else {
            return b.goalsScored - a.goalsScored; // Sort by goal difference
          }
        });
        console.log("data", data);
      }
    },
  },
};
</script>
<style scoped>
.points {
  font-weight: 800;
  color: aliceblue;
}
.subtleBG {
  /* background: rgba(99, 118, 212, 0.194); */
}
</style>
<style>
.tableContainer tbody tr:first-child {
  background: rgb(85 89 106 / 19%) !important;
  border-radius: 10px !important;
}
</style>
