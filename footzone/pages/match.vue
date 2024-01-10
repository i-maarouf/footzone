<template>
  <section>
    <!-- <template> -->

    <div class="mainContainer p-5 container mx-auto">
      <div class="scoreboard w-full py-2">
        <div class="team1 w-1/3">
          <div class="name text-center">
            {{ team1 }}
          </div>
          <div class="card shadow-lg" :style="cardStyle1">
            <div class="score">{{ team1Score }}</div>
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
                  <UMeter
                    :value="matchStatistics.team1.possession"
                    :color="team1TailwindColor"
                  />
                  <UMeter
                    :value="matchStatistics.team2.possession"
                    :color="team2TailwindColor"
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
                    :color="team1TailwindColor"
                  />
                  <UMeter
                    :value="matchStatistics.team2.totalAttempts"
                    :color="team2TailwindColor"
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
                    :color="team1TailwindColor"
                  />
                  <UMeter
                    :value="matchStatistics.team2.yellowCards"
                    :color="team2TailwindColor"
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
                  <UMeter
                    :value="matchStatistics.team1.redCards"
                    :color="team1TailwindColor"
                  />
                  <UMeter
                    :value="matchStatistics.team2.redCards"
                    :color="team2TailwindColor"
                  />
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
                    :color="team1TailwindColor"
                  />
                  <UMeter
                    :value="matchStatistics.team2.conversionRate"
                    :color="team2TailwindColor"
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
        <div class="team2 w-1/3">
          <div class="name text-center">
            {{ team2 }}
          </div>
          <div class="card2 shadow-lg" :style="cardStyle2">
            <div class="score">{{ team2Score }}</div>
          </div>
        </div>
      </div>
    </div>

    <Timeline
      :teamsSelected="teamsSelected"
      @changeTeam1Score="getTeam1Score($event)"
      @changeTeam2Score="getTeam2Score($event)"
      @getMatchStatistics="getMatchStatistics($event)"
    />
  </section>
</template>

<script>
import teams from "../utils/teams";
export default {
  name: "matches",
  data() {
    return {
      team1: "",
      team2: "",
      team1Score: 0,
      team2Score: 0,
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
      teams: teams,
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
        let indexOfTeam = Math.floor(Math.random() * this.teams.length);
        console.log("index: " + indexOfTeam);
        let teamSelected = this.teams[indexOfTeam];
        console.log("teamSelected: " + teamSelected);

        if (!this.teamsSelected.includes(teamSelected)) {
          this.teamsSelected.push(teamSelected);
        } else {
          i--;
        }
      }
      this.team1 = this.teamsSelected[0].name;
      this.team2 = this.teamsSelected[1].name;
    },
  },
  computed: {
    team1TailwindColor() {
      // Assuming matchStatistics.team1.colors.primary is in the format "#RRGGBB"
      if (this.teamsSelected[0]) {
        const primaryColor = this.teamsSelected[0].colors.primary;

        // Map the primary color to the closest Tailwind CSS color variable
        // You may need to adjust this mapping based on your specific color scheme
        const colorMapping = {
          "#fff": "white",
          "#D00027": "red",
          "#00A398": "slate",
          "#FDE100": "teal",
          "#004d98": "cyan",
          "#DC052D": "stone",
          // Add more mappings as needed
        };

        // Default to 'red-500' if the primary color is not found in the mapping
        return colorMapping[primaryColor];
      }
    },
    team2TailwindColor() {
      // Assuming matchStatistics.team1.colors.primary is in the format "#RRGGBB"
      if (this.teamsSelected[1]) {
        const primaryColor = this.teamsSelected[1].colors.primary;

        // Map the primary color to the closest Tailwind CSS color variable
        // You may need to adjust this mapping based on your specific color scheme
        const colorMapping = {
          "#fff": "white",
          "#D00027": "red",
          "#00A398": "slate",
          "#FDE100": "teal",
          "#004d98": "cyan",
          "#DC052D": "stone",
          // Add more mappings as needed
        };

        // Default to 'red-500' if the primary color is not found in the mapping
        return colorMapping[primaryColor];
      }
    },
    cardStyle1() {
      if (this.teamsSelected[0]) {
        const primaryColor = this.teamsSelected[0].colors.primary;
        const secondaryColor = this.teamsSelected[0].colors.secondary;
        const thirdColor = this.teamsSelected[0].colors.third;
        return {
          background: `linear-gradient(315deg, rgba(0, 0, 0, 0) 70.26%, ${thirdColor} 116.8%), linear-gradient(131deg, ${primaryColor} -2.76%, ${secondaryColor} 123.04%)`,
          // Add more styles as needed
        };
      }
    },
    cardStyle2() {
      if (this.teamsSelected[1]) {
        const primaryColor = this.teamsSelected[1].colors.primary;
        const secondaryColor = this.teamsSelected[1].colors.secondary;
        const thirdColor = this.teamsSelected[1].colors.third;
        return {
          background: `linear-gradient(315deg, rgba(0, 0, 0, 0) 70.26%, ${thirdColor} 116.8%), linear-gradient(131deg, ${primaryColor} -2.76%, ${secondaryColor} 123.04%)`,
          // Add more styles as needed
        };
      }
    },
  },
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
  flex-direction: column;
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
  color: rgba(0, 0, 0, 0.45);
  font-family: Poppins;
  font-size: 201px;
  /* font-style: italic; */
  font-weight: 700;
  line-height: normal;
}
.name {
  color: #c0c1d6;
  font-family: Poppins;
  font-size: 40px;
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
