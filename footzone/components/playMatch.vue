<template>
  <section>
    <!-- <template> -->

    <div class="mainContainer p-5 container mx-auto items-center flex flex-col">
      <UBreadcrumb :links="links" />
      <div class="stadium flex items-center gap-2 my-3">
        <img src="../assets/icons8-stadium-64.png" style="width: 28px" alt="" />
        {{ teams[0].venue }}
      </div>
      <div class="scoreboard w-full py-2">
        <div class="team1 flex">
          <div class="name text-center flex flex-col items-center gap-3">
            <img :src="teams[0].crest" alt="" style="width: 64px" />
            <div class="flex gap-3">
              {{ team1 }}
            </div>
            <div class="score">{{ team1Score }}</div>
          </div>
          <div
            class="span"
            v-for="(reds, index) in Number(matchStatistics.team1.redCards)"
            :key="index"
          >
            <img
              src="../assets/red_card.png"
              style="width: 28px; height: 36px"
              alt=""
            />
          </div>
          <!-- <div class="card shadow-lg">
            <div class="score">{{ team1Score }}</div>
          </div> -->
        </div>

        <div class="team2 w-1/3 gap-2">
          <div
            class="span flex fap-3"
            v-for="(reds, index) in Number(matchStatistics.team2.redCards)"
            :key="index"
          >
            <img
              src="../assets/red_card.png"
              style="width: 28px; height: 36px"
              alt=""
            />
          </div>
          <div class="name text-center flex flex-col items-center gap-3">
            <img :src="teams[1].crest" alt="" style="width: 64px" />
            {{ team2 }}{{ team2.redCards }}
            <div class="score">{{ team2Score }}</div>
          </div>

          <!-- <div class="card2 shadow-lg">
            <div class="score">{{ team2Score }}</div>
          </div> -->
        </div>
      </div>
      <div class="matchStats w-2/3 gap-3">
        <div class="stat">
          <div class="statTitle">Possession</div>
          <div class="innerContainer w-full">
            <div class="barGraph" style="padding: 0 20px; width: 100%">
              <div class="numberOfTimes">
                {{
                  matchStatistics.team2.possession > 0
                    ? Math.trunc(
                        (matchStatistics.team1.possession /
                          (matchStatistics.team1.possession +
                            matchStatistics.team2.possession)) *
                          100
                      )
                    : 0
                }}<span style="font-size: 12px">%</span>
              </div>
              <UMeterGroup
                :min="0"
                :max="
                  matchStatistics.team1.possession +
                  matchStatistics.team2.possession
                "
                size="2xl"
                :indicator="false"
                icon="i-heroicons-minus"
              >
                <UMeter :value="matchStatistics.team1.possession" color="red" />
                <UMeter
                  :value="matchStatistics.team2.possession"
                  color="green"
                />
              </UMeterGroup>
              <div class="numberOfTimes2">
                {{
                  matchStatistics.team2.possession > 0
                    ? Math.trunc(
                        (matchStatistics.team2.possession /
                          (matchStatistics.team1.possession +
                            matchStatistics.team2.possession)) *
                          100
                      )
                    : 0
                }}<span style="font-size: 12px">%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="stat">
          <div class="statTitle">Attempts On Target</div>
          <div class="innerContainer w-full">
            <div
              class="barGraph"
              style="padding: 0 20px; width: 100%; position: relative"
            >
              <div class="numberOfTimes">
                {{ matchStatistics.team1.totalAttempts }}
              </div>
              <UMeterGroup
                :min="0"
                :max="
                  matchStatistics.team1.totalAttempts +
                  matchStatistics.team2.totalAttempts
                "
                size="2xl"
                :indicator="false"
                icon="i-heroicons-minus"
              >
                <UMeter
                  :value="matchStatistics.team1.totalAttempts"
                  color="red"
                />
                <UMeter
                  :value="matchStatistics.team2.totalAttempts"
                  color="green"
                />
              </UMeterGroup>
              <div class="numberOfTimes2">
                {{ matchStatistics.team2.totalAttempts }}
              </div>
            </div>
          </div>
        </div>
        <div class="stat">
          <div class="statTitle">Yellow Cards</div>
          <div class="innerContainer w-full">
            <div class="barGraph" style="padding: 0 20px; width: 100%">
              <div class="numberOfTimes">
                {{ matchStatistics.team1.yellowCards }}
              </div>
              <UMeterGroup
                :min="0"
                :max="
                  matchStatistics.team1.yellowCards +
                  matchStatistics.team2.yellowCards
                "
                size="2xl"
                :indicator="false"
                icon="i-heroicons-minus"
              >
                <UMeter
                  :value="matchStatistics.team1.yellowCards"
                  color="red"
                />
                <UMeter
                  :value="matchStatistics.team2.yellowCards"
                  color="green"
                />
              </UMeterGroup>
              <div class="numberOfTimes2">
                {{ matchStatistics.team2.yellowCards }}
              </div>
            </div>
          </div>
        </div>
        <div class="stat">
          <div class="statTitle">Red Cards</div>
          <div class="innerContainer w-full">
            <div class="barGraph" style="padding: 0 20px; width: 100%">
              <div class="numberOfTimes">
                {{ matchStatistics.team1.redCards }}
              </div>
              <UMeterGroup
                :min="0"
                :max="
                  matchStatistics.team1.redCards +
                  matchStatistics.team2.redCards
                "
                size="2xl"
                :indicator="false"
                icon="i-heroicons-minus"
              >
                <UMeter :value="matchStatistics.team1.redCards" color="red" />
                <UMeter :value="matchStatistics.team2.redCards" color="green" />
              </UMeterGroup>
              <div class="numberOfTimes2">
                {{ matchStatistics.team2.redCards }}
              </div>
            </div>
          </div>
        </div>
        <div class="stat">
          <div class="statTitle">Conversion Rate</div>
          <div class="innerContainer w-full">
            <div class="barGraph" style="padding: 0 20px; width: 100%">
              <div class="numberOfTimes">
                {{ Math.trunc(matchStatistics.team1.conversionRate)
                }}<span style="font-size: 12px">%</span>
              </div>
              <UMeterGroup
                :min="0"
                :max="
                  matchStatistics.team1.conversionRate +
                  matchStatistics.team2.conversionRate
                "
                size="2xl"
                :indicator="false"
                icon="i-heroicons-minus"
              >
                <UMeter
                  :value="matchStatistics.team1.conversionRate"
                  color="red"
                />
                <UMeter
                  :value="matchStatistics.team2.conversionRate"
                  color="green"
                />
              </UMeterGroup>
              <div class="numberOfTimes2">
                {{ Math.trunc(matchStatistics.team2.conversionRate)
                }}<span style="font-size: 12px">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Timeline
      :teamsSelected="teamsSelected"
      :matchWeek="matchWeek"
      :matchNo="matchNo"
      :setMatch="setMatch"
      :table="table"
      @changeTeam1Score="getTeam1Score($event)"
      @changeTeam2Score="getTeam2Score($event)"
      @getMatchStatistics="getMatchStatistics($event)"
    />
  </section>
</template>

<script>
// import teams from "../utils/teams";
export default {
  props: {
    teams: Array,
    matchWeek: Number,
    matchNo: Number,
    table: Array,
    setMatch: Function,
  },
  name: "playMatch",
  data() {
    return {
      team1: "",
      team2: "",
      team1Score: 0,
      team2Score: 0,
      links: [
        {
          label: "Match Week " + this.matchWeek,
          icon: "i-heroicons-home",
        },
        {
          label: "Match " + (this.matchNo + 1),
          icon: "i-heroicons-square-3-stack-3d",
        },
      ],
      matchStatistics: {
        team1: {
          possession: 0,
          totalAttempts: 0,
          conversionRate: 0,
          redCards: 0,
          yellowCards: 0,
        },
        team2: {
          possession: 0,
          totalAttempts: 0,
          conversionRate: 0,
          redCards: 0,
          yellowCards: 0,
        },
      },
      // teams: teams,
      teamsSelected: [],
    };
  },
  mounted() {
    this.getTeams();
  },
  beforeUpdate() {},
  methods: {
    getTeam1Score(score) {
      console.log("Changing score: " + score);
      this.team1Score = score;
    },
    getTeam2Score(score) {
      console.log("Changing score: " + score);
      this.team2Score = score;
    },
    getMatchStatistics(statistics) {
      this.matchStatistics = statistics;
    },
    getTeams() {
      for (let i = 0; i < 2; i++) {
        let teamSelected = this.teams[i];
        console.log("teamSelected: " + teamSelected);

        if (!this.teamsSelected.includes(teamSelected)) {
          this.teamsSelected.push(teamSelected);
        } else {
          i--;
        }
      }
      this.team1 = this.teams[0].name;
      this.team2 = this.teams[1].name;
    },
  },
  // computed: {
  //   team1TailwindColor() {
  //     // Assuming matchStatistics.team1.colors.primary is in the format "#RRGGBB"
  //     if (this.teamsSelected[0]) {
  //       const primaryColor = this.teamsSelected[0].colors.primary;

  //       // Map the primary color to the closest Tailwind CSS color variable
  //       // You may need to adjust this mapping based on your specific color scheme
  //       const colorMapping = {
  //         "#fff": "white",
  //         "#D00027": "red",
  //         "#00A398": "slate",
  //         "#FDE100": "teal",
  //         "#004d98": "cyan",
  //         "#DC052D": "stone",
  //         // Add more mappings as needed
  //       };

  //       // Default to 'red-500' if the primary color is not found in the mapping
  //       return colorMapping[primaryColor];
  //     }
  //   },
  //   team2TailwindColor() {
  //     // Assuming matchStatistics.team1.colors.primary is in the format "#RRGGBB"
  //     if (this.teamsSelected[1]) {
  //       const primaryColor = this.teamsSelected[1].colors.primary;

  //       // Map the primary color to the closest Tailwind CSS color variable
  //       // You may need to adjust this mapping based on your specific color scheme
  //       const colorMapping = {
  //         "#fff": "white",
  //         "#D00027": "red",
  //         "#00A398": "slate",
  //         "#FDE100": "teal",
  //         "#004d98": "cyan",
  //         "#DC052D": "stone",
  //         // Add more mappings as needed
  //       };

  //       // Default to 'red-500' if the primary color is not found in the mapping
  //       return colorMapping[primaryColor];
  //     }
  //   },
  //   cardStyle1() {
  //     if (this.teamsSelected[0]) {
  //       const primaryColor = this.teamsSelected[0].colors.primary;
  //       const secondaryColor = this.teamsSelected[0].colors.secondary;
  //       const thirdColor = this.teamsSelected[0].colors.third;
  //       return {
  //         background: `linear-gradient(315deg, rgba(0, 0, 0, 0) 70.26%, ${thirdColor} 116.8%), linear-gradient(131deg, ${primaryColor} -2.76%, ${secondaryColor} 123.04%)`,
  //         // Add more styles as needed
  //       };
  //     }
  //   },
  //   cardStyle2() {
  //     if (this.teamsSelected[1]) {
  //       const primaryColor = this.teamsSelected[1].colors.primary;
  //       const secondaryColor = this.teamsSelected[1].colors.secondary;
  //       const thirdColor = this.teamsSelected[1].colors.third;
  //       return {
  //         background: `linear-gradient(315deg, rgba(0, 0, 0, 0) 70.26%, ${thirdColor} 116.8%), linear-gradient(131deg, ${primaryColor} -2.76%, ${secondaryColor} 123.04%)`,
  //         // Add more styles as needed
  //       };
  //     }
  //   },
  // },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");
</style>

<style scoped>
.mainContainer {
  background: #111828;
  /* height: 45vh; */
}
.stadium {
  font-size: 14px;
}
.scoreboard {
  display: flex;
  align-items: flex-end;
  /* border-bottom: 5px solid #3c3c3c; */
  justify-content: space-between;
}
.matchStats {
  padding: 0 50px;
  display: flex;
  flex-direction: column;
}
.innerContainer {
  justify-content: center;
  display: flex;
  align-items: center;
}
.numberOfTimes2 {
  color: #fff;
  font-family: Poppins;
  font-size: 18px;
  /* font-style: italic; */
  font-weight: 700;
  z-index: 9;
  position: absolute;
  right: 29px;
  top: -3px;
  line-height: normal;
}
.numberOfTimes {
  color: #fff;
  font-family: Poppins;
  font-size: 18px;
  /* font-style: italic; */
  font-weight: 700;
  z-index: 9;
  position: absolute;
  left: 29px;
  top: -3px;
  line-height: normal;
}
.barGraph {
  position: relative;
}
.stat {
  display: flex;
  row-gap: 10px;
  align-items: center;
  /* align-self: center; */
  justify-content: center;
  flex-direction: column;
}
.statTitle {
  color: #c0c1d6;
  font-family: Poppins;
  font-size: 20px;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
}
.team1,
.team2 {
  display: flex;
  /* flex-direction: column; */
  row-gap: 5px;
  max-width: 300px;
}
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  border-radius: 20px;
  min-width: 300px;
  /* border: 1px solid #d1d1dc; */
  /* background: #3c3c3c; */
  /* background: linear-gradient(315deg, rgba(0, 0, 0, 0) 70.26%, #febe10a3 116.8%),
    linear-gradient(131deg, #fff -2.76%, #00529f76 123.04%); */

  backdrop-filter: blur(5px);
}
.card2 {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  border-radius: 20px;
  min-width: 300px;
  /* border: 1px solid #d1d1dc; */
  /* background: #3c3c3c; */
  background: linear-gradient(315deg, rgba(0, 0, 0, 0) 0.26%, #a50044 156.8%),
    linear-gradient(91deg, #3c3c3c 0.76%, #004d98 123.04%);

  backdrop-filter: blur(5px);
}
.score {
  /* color: rgb(249, 249, 249); */
  font-family: Poppins;
  font-size: 64px;
  /* font-style: italic; */
  font-weight: 400;
  line-height: normal;
}
.name {
  color: #c0c1d6;
  font-family: Poppins;
  font-size: 24px;
  /* font-style: italic; */
  font-weight: 700;
  line-height: normal;
}
</style>
<style>
:is(.dark .dark\:text-cyan-400) {
  color: #a50044 !important;
}
:is(.dark .dark\:bg-cyan-400) {
  background: #a50044 !important;
}
:is(.dark .dark\:text-slate-400) {
  color: #00a398 !important;
}
:is(.dark .dark\:bg-slate-400) {
  background: #00a398 !important;
}
:is(.dark .dark\:text-teal-400) {
  color: #fde100 !important;
}
:is(.dark .dark\:bg-teal-400) {
  background: #fde100 !important;
}
:is(.dark .dark\:text-white-400) {
  color: #94a3b8 !important;
}
:is(.dark .dark\:bg-white-400) {
  color: #94a3b8 !important;
  background: #94a3b8 !important;
}
:is(.dark .dark\:text-red-400) {
  color: #d00027 !important;
}
:is(.dark .dark\:bg-red-400) {
  background: #d00027 !important;
}
:is(.dark .dark\:text-stone-400) {
  color: #dc052d !important;
}
:is(.dark .dark\:bg-stone-400) {
  background: #dc052d !important;
}
</style>
