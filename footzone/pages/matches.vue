<template>
  <section>
    <div
      class="flex p-5 items-center justify-center w-full space-x-4"
      v-if="loading"
    >
      <!-- <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" /> -->
      <div class="gap-4 container grid grid-cols-2 w-full space-between">
        <USkeleton class="h-[130px] w-[600px] skeletons" />
        <USkeleton class="h-[130px] w-[600px] skeletons" />
        <USkeleton class="h-[130px] w-[600px] skeletons" />
        <USkeleton class="h-[130px] w-[600px] skeletons" />
        <USkeleton class="h-[130px] w-[600px] skeletons" />
        <USkeleton class="h-[130px] w-[600px] skeletons" />
        <USkeleton class="h-[130px] w-[600px] skeletons" />
        <USkeleton class="h-[130px] w-[600px] skeletons" />
        <USkeleton class="h-[130px] w-[600px] skeletons" />
        <USkeleton class="h-[130px] w-[600px] skeletons" />
      </div>
    </div>

    <LeagueFixtures
      :fixtures="fixtures"
      :resetLeague="resetLeague"
      :getUserMatches="getUserMatches"
      :teamSelected="teamSelected"
      v-if="fixtures && !loading"
    />
    <div
      class="mainContainer p-5 container mx-auto flex flex-col items-center justify-center"
      v-if="!fixtures && !loading"
    >
      <div class="mainTitle text-center mb-10">
        Select the club you want to manage
      </div>
      <div class="leagues flex flex-col justify-between items-center">
        <UAccordion
          :items="items"
          :ui="{ wrapper: 'flex flex-col w-full' }"
          class="gap-5"
        >
          <template #default="{ item }">
            <UButton
              variant="ghost"
              color="indigo"
              class="border-b border-gray-200 dark:border-gray-700 leagueBackground"
              :ui="{
                padding: { sm: 'px-3' },
              }"
            >
              <template #leading>
                <div class="league w-1/3">
                  <div class="imgContainer">
                    <img
                      :src="item.leadingIcon"
                      style="width: 47px; z-index: 99; position: relative"
                      class="leagueLogo"
                    />
                  </div>
                </div>
              </template>
              <img :src="item.trailingIcon" class="outerImage" alt="" />

              <span class="truncate leagueName"> {{ item.label }}</span>

              <template #trailing>
                <div class="teams flex items-center justify-end gap-2 w-1/3">
                  20 Teams
                  <img
                    src="../assets/angle-circle-down-icon 1.png"
                    style="width: 16px"
                    alt=""
                  />
                </div>
              </template>
            </UButton>
          </template>
          <template #premier-league>
            <UButton
              class="team w-full"
              variant="soft"
              color="indigo"
              @click="selectTeam(teams)"
              v-for="teams in leagues[2].teams"
              :key="teams.name"
            >
              <img
                :src="teams.crest"
                alt=""
                style="width: 32px; max-height: 50px"
              />
              {{ teams.name }}
            </UButton>
          </template>
          <template #la-liga>
            <UButton
              class="team w-full"
              variant="ghost"
              @click="selectTeam(teams)"
              v-for="teams in leagues[1].teams"
              :key="teams.name"
            >
              <img :src="teams.crest" alt="" style="width: 32px" />
              {{ teams.name }}
            </UButton>
          </template>
          <template #bundesliga>
            <UButton
              class="team w-full"
              variant="ghost"
              @click="selectTeam(teams)"
              v-for="teams in leagues[3].teams"
              :key="teams.name"
            >
              <img :src="teams.crest" alt="" style="width: 32px" />
              {{ teams.name }}
            </UButton>
          </template>
          <template #serie-a>
            <UButton
              class="team w-full"
              variant="ghost"
              @click="selectTeam(teams)"
              v-for="teams in leagues[4].teams"
              :key="teams.name"
            >
              <img
                :src="teams.crest"
                alt=""
                style="width: 32px; max-height: 50px"
              />
              {{ teams.name }}
            </UButton>
          </template>
          <template #ligue-1>
            <UButton
              class="team w-full"
              variant="ghost"
              @click="selectTeam(teams)"
              v-for="teams in leagues[0].teams"
              :key="teams.name"
            >
              <img :src="teams.crest" alt="" style="width: 32px" />
              {{ teams.name }}
            </UButton>
          </template>
          <template #ucl>
            <UButton
              class="team w-full"
              variant="ghost"
              @click="selectTeam(teams)"
              v-for="teams in leagues[5].teams"
              :key="teams.name"
            >
              <img :src="teams.crest" alt="" style="width: 32px" />
              {{ teams.name }}
            </UButton>
          </template>
        </UAccordion>
      </div>
    </div>
    <div
      class="teamSelected fadeIn"
      v-if="teamSelected && !fixtures && !loading"
    >
      <div class="teamLeague w-1/3 flex items-center gap-0">
        <img
          :src="teamSelected.runningCompetitions[0].emblem"
          alt=""
          style="width: 64px; max-height: 50px; object-fit: contain"
        />
        <div class="teamName">
          {{ teamSelected.runningCompetitions[0].name }}
        </div>
      </div>
      <div class="teamSelectedInfo fadeIn flex items-center gap-3">
        <img
          :src="teamSelected.crest"
          class="fadeIn"
          alt=""
          style="width: 64px; max-height: 64px"
        />
        <div class="teamName">
          {{ teamSelected.name }}
        </div>
      </div>
      <div class="removeBtn w-1/3 flex justify-end">
        <UButton
          variant="soft"
          icon="i-heroicons-chevron-double-right"
          :trailing="true"
          label="Continue"
          @click="generateMatches()"
        />
      </div>
    </div>
  </section>
</template>

<script>
import leagues from "../utils/teams";
import { supabase } from "../src/lib/supabaseClient";
import { useUserStore } from "~/store/useUserStore";

export default {
  name: "matches",
  data() {
    return {
      showPL: false,
      leagues: leagues,
      matches: [],
      items: [
        {
          label: "Premier League",
          leadingIcon: "./leagues/premier-league.svg",
          trailingIcon: "./leagues/PL.svg",
          slot: "premier-league",
        },
        {
          label: "La Liga",
          leadingIcon: "./leagues/laliga-white.svg",
          trailingIcon: "./leagues/laLigaOffwhite.svg",
          slot: "la-liga",
        },
        {
          label: "Bundesliga",
          leadingIcon: "./leagues/bundesligawhite.svg",
          trailingIcon: "./leagues/BLGrey.svg",
          slot: "bundesliga",
        },
        {
          label: "Serie A",
          leadingIcon: "./leagues/serie-a.svg",
          trailingIcon: "./leagues/SerieAWhite.svg",
          slot: "serie-a",
        },
        {
          label: "Ligue 1",
          leadingIcon: "./leagues/ligue_1.svg",
          trailingIcon: "./leagues/Ligue1White.svg",
          slot: "ligue-1",
        },
        {
          label: "UEFA Champions League",
          leadingIcon: "./leagues/UEFAChampionsLeagueWhite.svg",
          trailingIcon: "./leagues/UCLOffWhite.svg",
          slot: "ucl",
        },
      ],
      user: [],
      loading: true,
      fixtures: [],
      teamSelected: "",
    };
  },
  mounted() {
    const userStore = useUserStore();

    this.getUserData();
  },
  beforeMounted() {},
  computed: {},

  methods: {
    async getUserData() {
      // this.loading = true;
      console.log("getting data....");
      const { data, error } = await supabase.from("users").select();
      // .then(() => {
      //   this.getUserMatches();
      //   this.getUserTeam();
      // });
      if (data) {
        // console.log("data:", data);

        this.getUserTeam();
        this.getUserMatches().then(() => {
          this.loading = false;
        });
      }
    },
    generateMatches() {
      this.updateUserTeam();
      let leagues = [
        "Ligue 1",
        "Primera Division",
        "Premier League",
        "Bundesliga",
        "Serie A",
        "UEFA Champions League",
      ];
      let index = leagues.lastIndexOf(
        this.teamSelected.runningCompetitions[0].name
      );
      let teams = this.leagues[index].teams.map((team) => team);
      const numberOfRounds = teams.length - 1;
      const noOfMatches = teams.length / 2;

      const numTeams = teams.length;

      const fixtures = [];
      this.shuffle(teams);

      for (let day = 0; day < numberOfRounds; day++) {
        const matchDay = [];
        for (let i = 0; i < noOfMatches; i++) {
          const team1 = teams[i];
          const team2 = teams[numTeams - 1 - i];

          if (team1 && team2) {
            matchDay.push({ team1, team2 });
          }
        }
        this.shuffle(matchDay);

        fixtures.push(matchDay);

        teams.splice(1, 0, teams.pop());
      }
      this.fixtures = fixtures;
      this.updateUserLeagueFixtures();
      let runningTeams = this.leagues[index].teams.map((team) => team);
      this.generateTable(runningTeams);
    },

    async updateUserTeam() {
      const userStore = useUserStore();

      const { data, error } = await supabase
        .from("teams")
        .update({ team: this.teamSelected })
        .eq("username", userStore.user.user_metadata.username)
        .select("");
    },
    async updateUserLeagueFixtures() {
      const userStore = useUserStore();

      const { data, error } = await supabase
        .from("fixtures")
        .update({ fixtures: this.fixtures })
        .eq("username", userStore.user.user_metadata.username)
        .select("");
    },
    async getUserMatches() {
      console.log("getting user matches....");
      const userStore = useUserStore();
      console.log("userStore", userStore.user.user_metadata.username);

      if (userStore) {
        console.log("userStore", userStore.user.user_metadata.username);

        const { data, error } = await supabase
          .from("fixtures")
          .select("fixtures")
          .eq("username", userStore.user.user_metadata.username);
        if (data) {
          this.fixtures = data[0].fixtures;
          console.log("data", data);
        }
      } else {
        console.log("error getting data....");
      }
    },
    async getUserTeam() {
      console.log("getting user team....");

      const userStore = useUserStore();
      // console.log("userStore", userStore);
      if (userStore) {
        console.log("userStore", userStore.user.user_metadata.username);
        const { data, error } = await supabase
          .from("teams")
          .select("team")
          .eq("username", userStore.user.user_metadata.username);
        if (data) {
          this.teamSelected = data[0].team;
          console.log("data", data);
        }
      } else {
        console.log("error getting data....");
      }
    },
    selectTeam(team) {
      this.teamSelected = team;
    },

    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },

    resetLeague() {
      this.fixtures = [];
      this.table = [];
      this.generateMatches();
    },
    async generateTable(teams) {
      let runningTeams = [];
      console.log("teams", teams);

      for (let i = 0; i < teams.length; i++) {
        // teams[i].teamInfo = teamInfo;
        let teamInfo = {
          name: teams[i].name,
          crest: teams[i].crest,
          matchesPlayed: 0,
          matchesWon: 0,
          matchesDrawn: 0,
          matchesLost: 0,
          goalsScored: 0,
          goalsConceded: 0,
          goalDifference: 0,
          points: 0,
        };
        // teamInfo.name = teams[i];
        // teams[i].teamInfo.name = teams[i];
        runningTeams.push(teamInfo);
        // runningTeams[i];
      }
      const userStore = useUserStore();

      const { data, error } = await supabase
        .from("standings")
        .update({ standings: runningTeams })
        .eq("username", userStore.user.user_metadata.username)
        .select("");
      // console.log("runningTeams", runningTeams);
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");
</style>

<style scoped>
.mainTitle {
  color: #fff;
  font-family: Poppins;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;

  line-height: normal;
}
.skeletons:nth-child(even) {
  justify-self: flex-end;
}
.league {
  height: 55px;
  /* width: 100%; */
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  /* padding: 0 10px; */
  transition: 0.25s all ease-in-out;
}
.outerImage {
  position: absolute;
  left: 0px;

  width: 100px;
  height: 100px;
}
.imgContainer {
  z-index: 1;
}
.leagueBackground:nth-child(n) {
  background: linear-gradient(93deg, #31a5ca 47.17%, #252a9d 74.7%);
  justify-content: space-between;
  padding: 0 10px;
  position: relative;
  transition: 0.25s all ease-in-out;
  overflow: hidden;
}
/* .PL {
  background: linear-gradient(93deg, #31a5ca 47.17%, #252a9d 74.7%);
  justify-content: space-between;
  padding: 0 10px;
  position: relative;
  overflow: hidden;
} */
.leagueBackground:nth-child(n + 2) {
  background: linear-gradient(93deg, #c93833 47.17%, #000 100.7%);
  justify-content: space-between;
  padding: 0 10px;
  transition: 0.25s all ease-in-out;
  position: relative;
  overflow: hidden;
}
.leagueBackground:nth-child(n + 4) {
  background: linear-gradient(93deg, #d10214 47.17%, #721515 74.7%);
  justify-content: space-between;
  transition: 0.25s all ease-in-out;
  padding: 0 10px;
  position: relative;
  overflow: hidden;
}

.leagueBackground:nth-child(n + 6) {
  background: linear-gradient(
    91deg,
    #29488d 49.55%,
    rgba(54, 53, 140, 0.4) 85.62%
  );
  justify-content: space-between;
  padding: 0 10px;
  transition: 0.25s all ease-in-out;
  position: relative;
  overflow: hidden;
}
.leagueBackground:nth-child(n + 8) {
  background: linear-gradient(91deg, #243d7f 49.55%, #06c167 85.62%);
  justify-content: space-between;
  transition: 0.25s all ease-in-out;
  padding: 0 10px;
  position: relative;
  overflow: hidden;
}
.leagueBackground:nth-child(n + 10) {
  background: linear-gradient(93deg, #252a9d 47.17%, #3b2050 74.7%);

  justify-content: space-between;
  transition: 0.25s all ease-in-out;
  padding: 0 10px;
  position: relative;
  overflow: hidden;
}
.leagueBackground:nth-child(n + 6) .leagueLogo {
  width: 28px !important;
}
.leagueBackground:nth-child(n + 8) .leagueLogo {
  width: 32px !important;
}
.leagueBackground:nth-child(n + 10) .leagueLogo {
  width: 55px !important;
}
.leagueBackground:nth-child(n):hover {
  box-shadow: 0px 0px 9.6px 1px #3a69ce;
}
.leagueBackground:nth-child(n + 2):hover {
  box-shadow: 0px 0px 9.6px 1px #c93833;
}
.leagueBackground:nth-child(n + 4):hover {
  box-shadow: 0px 0px 9.6px 1px #d10214;
}
.leagueBackground:nth-child(n + 6):hover {
  box-shadow: 0px 0px 9.6px 1px #3f6cce;
}
.leagueBackground:nth-child(n + 8):hover {
  box-shadow: 0px 0px 9.6px 1px #06c167;
}
.leagueBackground:nth-child(n + 10):hover {
  box-shadow: 0px 0px 9.6px 1px #5c10e0;
}
.leagueName {
  color: #fff;
  font-family: Poppins;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.teamSelected {
  background: #252c37;
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  align-items: center;
  z-index: 9;
  justify-content: space-between;
}
.premierLeagueBG {
  background: linear-gradient(93deg, #31a5ca 47.17%, #252a9d 74.7%);
}
.laLigaBG {
  background: linear-gradient(93deg, #c93833 47.17%, #000 100.7%);
}
.serieABG {
  background: linear-gradient(
    91deg,
    #29488d 49.55%,
    rgba(54, 53, 140, 0.4) 85.62%
  );
}
.bundesligaBG {
  background: linear-gradient(93deg, #d10214 47.17%, #721515 74.7%);
}
.ligue1BG {
  background: linear-gradient(91deg, #243d7f 49.55%, #06c167 85.62%);
}
.uclBG {
  background: linear-gradient(93deg, #252a9d 47.17%, #3b2050 74.7%);
}
.MD {
  background: #0d121e;
  padding: 10px;
  width: 70px;
  color: #fff;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.opponent .teamName {
  color: #c0c1d6;
  font-family: Poppins;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.fixtures {
  padding: 10px 0;
}
.vs {
  color: #fff;
  font-family: Poppins;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.fixtureInfo {
  padding: 10px 0;
}
.teamSelected2 {
  /* background: linear-gradient(93deg, #31a5ca 47.17%, #252a9d 74.7%); */

  display: flex;
  width: 100%;
  padding: 5px 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  align-items: center;
  z-index: 9;
  justify-content: space-between;
}

.teamName {
  color: #fff;
  font-family: Poppins;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.fadeIn {
  animation: fadeIn 0.25s;
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
.teams {
  color: #fff;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.team {
  display: flex;
  align-items: center;
  column-gap: 15px;
  color: white;
  margin-bottom: 10px;
}
</style>
