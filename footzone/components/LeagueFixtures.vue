<template>
  <div>
    <div
      class="mainContainer p-5 container mx-auto flex flex-col items-center justify-center"
      v-if="!playMatch"
    >
      <div
        class="flex flex-wrap gap-4 mb-10 justify-between"
        v-if="currentFixture"
      >
        <UButton size="sm" class="justify-center" @click="resetLeague()"
          >Reset</UButton
        >
        <div class="matchWeek">Match Week {{ page }}</div>
        <div class="matches grid grid-cols-2 gap-4 justify-between w-full">
          <div
            v-for="(match, index) in currentFixture"
            class="flex matchCard"
            :key="match[0]"
          >
            <div
              :class="
                (match.team1.name == teamSelected.name ||
                  match.team2.name == teamSelected.name) &&
                match.outcome &&
                match.outcome.winner == teamSelected.name
                  ? 'match winnerCard'
                  : (match.team1.name == teamSelected.name ||
                      match.team2.name == teamSelected.name) &&
                    match.outcome &&
                    match.outcome.winner == null
                  ? 'match drawCard'
                  : (match.team1.name == teamSelected.name ||
                      match.team2.name == teamSelected.name) &&
                    match.outcome &&
                    match.outcome.winner != teamSelected.name
                  ? 'match loserCard'
                  : 'match '
              "
            >
              <div class="teamsContainer">
                <div
                  :class="
                    !match.outcome
                      ? 'team1 flex items-center gap-2'
                      : match.outcome.team1Score > match.outcome.team2Score
                      ? 'selectedTeam team1 flex items-center gap-2'
                      : 'team1 flex items-center gap-2'
                  "
                >
                  <img :src="match.team1.crest" style="width: 32px" alt="" />
                  {{ match.team1.name }}
                  <span v-if="match.outcome">
                    {{ match.outcome.team1Score }}
                  </span>
                </div>

                <div
                  :class="
                    !match.outcome
                      ? 'team1 flex items-center gap-2'
                      : match.outcome.team2Score > match.outcome.team1Score
                      ? 'selectedTeam team2 flex items-center gap-2'
                      : 'team2 flex items-center gap-2'
                  "
                >
                  <img :src="match.team2.crest" style="width: 32px" alt="" />

                  {{ match.team2.name }}
                  <span v-if="match.outcome">
                    {{ match.outcome.team2Score }}
                  </span>
                </div>
              </div>
              <div class="matchInfo">
                <div class="matchNo">Match {{ index + 1 }}</div>
                <div class="stadium flex items-center gap-2">
                  <img
                    src="../assets/icons8-stadium-64.png"
                    style="width: 28px"
                    alt=""
                  />
                  {{ match.team1.venue }}
                </div>
                <UButton
                  size="sm"
                  class="justify-center"
                  @click="handleMatch(match.team1, match.team2, page, index)"
                  v-if="
                    (match.team1.name == teamSelected.name ||
                      match.team2.name == teamSelected.name) &&
                    !match.outcome
                  "
                  >Play Match</UButton
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <UPagination
        v-model="page"
        :max="fixtures.length"
        :page-count="pageCount"
        @click="update()"
        :total="fixtures.length"
      />
    </div>
    <PlayMatch
      v-if="playMatch"
      :table="table"
      :teams="teams"
      :matchWeek="matchWeek"
      :matchNo="matchNo"
      :setMatch="setMatch"
    />
  </div>
</template>

<script>
import { useUserStore } from "~/store/useUserStore";
import { supabase } from "../src/lib/supabaseClient";
export default {
  props: {
    fixtures: Array,
    teamSelected: Object,
    resetLeague: Function,
    getUserMatches: Function,
  },
  data() {
    return {
      page: 1,
      pageCount: 1,
      teams: [],
      table: [],
      matchWeek: "",
      matchNo: "",
      playMatch: false,
      //   pageTotal: this.fixtures.length,
    };
  },
  mounted() {
    this.getTableFixtures();
    this.getLeagueStandings();
  },
  methods: {
    async getTableFixtures() {},
    update() {
      console.log("page:", this.page);
    },

    handleMatch(team1, team2, matchWeek, matchNo) {
      console.log("teams: ", team1, team2);
      this.playMatch = true;
      this.matchWeek = matchWeek;
      this.matchNo = matchNo;
      this.teams.push(team1, team2);
      //   this.$router.push({ path: "/match", query: { teams: [team1, team2] } });
      this.handleWeekMatches(matchWeek, matchNo);
    },
    handleWeekMatches(matchWeek, skippedMatch) {
      console.log("Matches ", this.fixtures[matchWeek - 1]);

      for (let i = 0; i < this.fixtures[matchWeek - 1].length; i++) {
        let team1 = this.fixtures[matchWeek - 1][i].team1;
        let team2 = this.fixtures[matchWeek - 1][i].team2;
        if (i != skippedMatch) {
          let outcome = this.simulateMatch(team1, team2, i);
          this.fixtures[matchWeek - 1][i].outcome = outcome;
        }
      }
      this.updateUserLeagueFixtures().then(() => {
        this.updateLeagueStandings();
      });
    },
    simulateMatch(team1, team2, matchIndex) {
      let elo1 = team1.ELO;
      let elo2 = team2.ELO;
      const range = 100;
      const homeAdvantage = 0.02; // Advantage for the home team
      const adjustmentFactor = 2; // You can tweak this value
      let team1Score = 0;
      let team2Score = 0;
      let diff = Math.abs(elo1 - elo2);
      diff % 2 == 0 ? diff++ : null;
      console.log("Match", matchIndex + ": ", team1, team2);
      console.log("diff", diff);
      let probability1 =
        0.5 +
        homeAdvantage +
        (elo1 > elo2 ? 1 : -1) * (diff / range) * adjustmentFactor;
      let minChances = 8;
      let maxChances = 12;
      let noOfChances = Math.floor(
        Math.random() * (maxChances - minChances + 1) + minChances
      );
      for (let i = 0; i < noOfChances; i++) {
        const random = Math.random();

        if (random < probability1) {
          const random2 = Math.random();
          if (random2 > 0.7) team1Score++;
        } else {
          const random2 = Math.random();
          if (random2 > 0.7) team2Score++;
        }
      }
      let outcome = {
        team1Score: team1Score,
        team2Score: team2Score,
        winner:
          team1Score == team2Score
            ? null
            : team1Score > team2Score
            ? team1.name
            : team2.name,
      };

      this.updateFixtureOutcome(team1, team2, outcome);

      console.log("Outcome", outcome);
      return outcome;
    },
    setMatch() {
      this.getUserMatches().then(() => {
        this.teams = [];
        this.playMatch = false;
      });
    },
    //  async getLeagueFixtures() {
    //   const userStore = useUserStore();

    //   const { data, error } = await supabase
    //     .from("fixtures")
    //     .select("fixtures")
    //     .eq("username", userStore.user.user_metadata.username);

    //   if (data) {
    //     this.fixtures = data[0].fixtures;
    //     console.log("data", data);
    //   }
    // },
    async updateUserLeagueFixtures() {
      const userStore = useUserStore();
      const { data, error } = await supabase
        .from("fixtures")
        .update({ fixtures: this.fixtures })
        .eq("username", userStore.user.user_metadata.username)
        .select("");
    },
    async updateLeagueStandings() {
      const userStore = useUserStore();
      const { data, error } = await supabase
        .from("standings")
        .update({ standings: this.table })
        .eq("username", userStore.user.user_metadata.username)
        .select("");
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

        console.log("data", data);
      }
    },
    updateFixtureOutcome(team1, team2, outcome) {
      for (let i = 0; i < this.table.length; i++) {
        if (this.table[i].name == team1.name) {
          this.table[i].matchesPlayed++;
          if (outcome.winner == team1.name) {
            this.table[i].matchesWon++;
            this.table[i].points += 3;
          } else if (outcome.winner != null) {
            this.table[i].matchesLost++;
          } else if (outcome.winner == null) {
            this.table[i].matchesDrawn++;
            this.table[i].points += 1;
          }
          this.table[i].goalsScored += outcome.team1Score;
          this.table[i].goalsConceded += outcome.team2Score;
          let GD = outcome.team1Score - outcome.team2Score;
          this.table[i].goalDifference += GD;
        }
        if (this.table[i].name == team2.name) {
          this.table[i].matchesPlayed++;
          if (outcome.winner == this.table[i].name) {
            this.table[i].matchesWon++;
            this.table[i].points += 3;
          } else if (outcome.winner != null) {
            this.table[i].matchesLost++;
          } else if (outcome.winner == null) {
            this.table[i].matchesDrawn++;
            this.table[i].points += 1;
          }
          this.table[i].goalsScored += outcome.team2Score;
          this.table[i].goalsConceded += outcome.team1Score;
          let GD = outcome.team2Score - outcome.team1Score;
          this.table[i].goalDifference += GD;
        }
      }
    },
  },
  computed: {
    currentFixture() {
      return this.fixtures[this.page - 1];
    },
  },
};
</script>
<style scoped>
.match {
  border-radius: 5px;
  background: rgba(181, 218, 255, 0.07);
  padding: 5px 10px;
  display: flex;
  align-items: center;
  width: 622px;
  height: 130px;
  justify-content: space-between;
  /* flex-direction: column; */
  /* row-gap: 5px; */
}
.winnerCard {
  background: rgba(37, 114, 49, 0.27);
}
.loserCard {
  background: rgba(165, 49, 49, 0.32);
}
.drawCard {
  background: rgba(150, 157, 164, 0.297);
}
.matchCard:nth-child(even) {
  justify-self: flex-end;
}
.matchWeek {
  border-radius: 10px 10px 0px 0px;
  background: linear-gradient(94deg, #32a5ca 46.99%, #243d7f 76.72%);
  color: #fff;
  font-family: Poppins;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 3px 10px;
  width: 100%;
}
.teamsContainer,
.matchInfo {
  display: flex;
  /* align-items: center; */
  justify-content: space-around;
  flex-direction: column;
  height: 100%;
  row-gap: 5px;
}
.selectedTeam {
  color: #fff !important;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.matchInfo {
  align-items: flex-end;
}
.stadium {
  font-size: 10px;
}
.matchNo {
  border-radius: 20px;
  background: #111828;
  padding: 3px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  width: 90px;
  line-height: normal;
}

.team1,
.team2 {
  color: #c0c1d691;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
</style>
