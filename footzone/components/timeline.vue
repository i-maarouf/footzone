<template>
  <div class="mainContainer flex flex-col py-4 items-center justify-center">
    <Loading v-if="loading" />

    <UProgress
      animation="swing"
      size="sm"
      :value="currentTime"
      :max="90"
      steps="0.1"
    />
    <div class="container pt-5 grid grid-cols-3">
      <div class="header">Timeline</div>
      <div class="flex relative items-center justify-center flex-col">
        <div class="time">{{ currentTime }}<span class="italic">'</span></div>
        <!-- <div class="events w-full">Jude Bellingham</div> -->
      </div>
      <div class="pause float-right justify-self-end items-center">
        <UButton
          :icon="
            matchFinish
              ? 'i-heroicons-arrow-long-right'
              : pause == true
              ? 'i-heroicons-play'
              : pause == false
              ? 'i-heroicons-pause'
              : ''
          "
          size="sm"
          trailing
          color="primary"
          square
          :label="matchFinish ? 'Continue' : ''"
          variant="solid"
          @click="handleMatchStatus"
        />
      </div>
    </div>
    <div
      class="container timeline py-2 flex items-end justify-center"
      id="content"
    >
      <div class="outsideContainer flex flex-col-reverse gap-4 items-center">
        <div
          :class="
            event.for == this.teamsSelected[0].name
              ? ' event flex flex-col gap-1 leftSide'
              : 'event flex flex-col gap-1 rightSide'
          "
          v-for="event in eventsTimeline"
          :key="event.minute"
          :id="event.minute"
        >
          <div class="info items-center justify-between gap-2 flex">
            <span>{{
              event.type == "redCard"
                ? "Red Card"
                : event.type == "yellowCard"
                ? "Yellow Card"
                : event.outcome == "goal"
                ? "GOAL"
                : event.outcome == "missed"
                ? "Attempt On Target"
                : "Undefined"
            }}</span>
            <span>{{ event.minute }}'</span>
          </div>
          <div
            :class="
              event.type == 'yellowCard'
                ? 'playerYellow items-center justify-center gap-2 flex'
                : event.type == 'redCard'
                ? 'playerRed items-center justify-center gap-2 flex'
                : event.outcome == 'goal'
                ? 'playerGoal items-center justify-center gap-2 flex'
                : event.outcome == 'missed'
                ? 'playerNoGoal items-center justify-center gap-2 flex'
                : 'playerNoGoal items-center justify-center gap-2 flex'
            "
          >
            <img
              :src="
                event.type == 'yellowCard'
                  ? './yellow-card.svg'
                  : event.type == 'redCard'
                  ? './red-card.svg'
                  : event.outcome == 'goal'
                  ? './goal.svg'
                  : event.outcome == 'missed'
                  ? './onTarget.svg'
                  : ''
              "
              :class="event.outcome == 'goal' ? 'bounce' : ''"
              style="width: 28px"
              alt=""
            />
            Jude Bellingham
          </div>
        </div>
      </div>
      <!-- <UDivider
        color="gray"
        orientation="vertical"
        class="divider"
        :ui="{ border: { size: { vertical: 'border-t-2' } } }"
      /> -->
    </div>
    <UModal v-model="action" class="relative" prevent-close>
      <div
        class="p-4 flex nuxtModal items-center gap-4 flex-col"
        style=""
        v-if="
          this.typeOfEvent[this.playMinutes.indexOf(this.currentTime - 1)]
            .event == 'chance'
        "
      >
        <!-- <Placeholder class="h-48" /> -->
        <div class="eventTitle">Chance</div>
        <div class="eventInfo">
          <div class="playerInfo">
            <div class="playerName">Jude Bellingham</div>
            <div class="teamName">
              {{
                this.typeOfEvent[this.playMinutes.indexOf(this.currentTime - 1)]
                  .for
              }}
            </div>
          </div>
          <img src="../assets/football.svg" style="width: 80px" alt="" />
          <div class="minute absolute px-4">{{ this.currentTime }}'</div>
        </div>
        <div class="goal border-t-8 border-x-8 border-sky-100 rounded-t-xl">
          <!-- <div class="w-full"> -->
          <UButton
            size="xl"
            :disabled="disableButtons ? true : false"
            color="indigo"
            square
            :ui="{ rounded: 'rounded-none' }"
            :class="
              this.options[0].outcome == true
                ? 'p-10 w-1/3 h-full inline-block shotGoal'
                : this.options[0].outcome == false
                ? 'p-10 w-1/3 h-full inline-block shotMissed'
                : 'p-10 w-1/3 h-full inline-block'
            "
            variant="outline"
            @click="
              handleAction(1, this.playMinutes.indexOf(this.currentTime - 1))
            "
          />
          <UButton
            size="xl"
            color="indigo"
            :ui="{ rounded: 'rounded-none' }"
            :disabled="disableButtons ? true : false"
            square
            :class="
              this.options[1].outcome == true
                ? 'p-10 w-1/3 h-full inline-block shotGoal'
                : this.options[1].outcome == false
                ? 'p-10 w-1/3 h-full inline-block shotMissed'
                : 'p-10 w-1/3 h-full inline-block'
            "
            variant="outline"
            @click="
              handleAction(2, this.playMinutes.indexOf(this.currentTime - 1))
            "
          />

          <UButton
            size="xl"
            color="indigo"
            :ui="{ rounded: 'rounded-none' }"
            :disabled="disableButtons ? true : false"
            square
            :class="
              this.options[2].outcome == true
                ? 'p-10 w-1/3 h-full inline-block shotGoal'
                : this.options[2].outcome == false
                ? 'p-10 w-1/3 h-full inline-block shotMissed'
                : 'p-10 w-1/3 h-full inline-block'
            "
            variant="outline"
            @click="
              handleAction(3, this.playMinutes.indexOf(this.currentTime - 1))
            "
          />
          <!-- </div> -->
          <!-- <div class="w-full"> -->
          <UButton
            size="xl"
            color="indigo"
            :ui="{ rounded: 'rounded-none' }"
            square
            :disabled="disableButtons ? true : false"
            :class="
              this.options[3].outcome == true
                ? 'p-10 w-1/3 h-full inline-block shotGoal'
                : this.options[3].outcome == false
                ? 'p-10 w-1/3 h-full inline-block shotMissed'
                : 'p-10 w-1/3 h-full inline-block'
            "
            variant="outline"
            @click="
              handleAction(4, this.playMinutes.indexOf(this.currentTime - 1))
            "
          />
          <UButton
            size="xl"
            color="indigo"
            :ui="{ rounded: 'rounded-none' }"
            :disabled="disableButtons ? true : false"
            square
            :class="
              this.options[4].outcome == true
                ? 'p-10 w-1/3 h-full inline-block shotGoal'
                : this.options[4].outcome == false
                ? 'p-10 w-1/3 h-full inline-block shotMissed'
                : 'p-10 w-1/3 h-full inline-block'
            "
            variant="outline"
            @click="
              handleAction(5, this.playMinutes.indexOf(this.currentTime - 1))
            "
          />
          <UButton
            size="xl"
            color="indigo"
            :ui="{ rounded: 'rounded-none' }"
            :disabled="disableButtons ? true : false"
            square
            :class="
              this.options[5].outcome == true
                ? 'p-10 w-1/3 h-full inline-block shotGoal'
                : this.options[5].outcome == false
                ? 'p-10 w-1/3 h-full inline-block shotMissed'
                : 'p-10 w-1/3 h-full inline-block'
            "
            variant="outline"
            @click="
              handleAction(6, this.playMinutes.indexOf(this.currentTime - 1))
            "
          />
          <!-- </div> -->
        </div>
      </div>
      <div
        class="p-4 flex nuxtModal items-center gap-7 flex-col"
        v-if="
          this.typeOfEvent[this.playMinutes.indexOf(this.currentTime - 1)]
            .event == 'yellowCard'
        "
      >
        <!-- <Placeholder class="h-48" /> -->
        <div class="eventTitle">Yellow Card</div>
        <div class="eventInfo">
          <div class="playerInfo">
            <div class="playerName">Jude Bellingham</div>
            <div class="teamName">
              {{
                this.typeOfEvent[this.playMinutes.indexOf(this.currentTime - 1)]
                  .for
              }}
            </div>
          </div>
          <img src="../assets/yellow-card.svg" style="width: 80px" alt="" />

          <div class="minute absolute px-4">{{ this.currentTime }}'</div>
        </div>
        <UButton
          size="md"
          color="indigo"
          square
          label="Continue"
          variant="soft"
          class="w-4/5 justify-center"
          @click="this.action = false"
        />
      </div>
      <div
        class="p-4 flex nuxtModal items-center gap-7 flex-col"
        v-if="
          this.typeOfEvent[this.playMinutes.indexOf(this.currentTime - 1)]
            .event == 'redCard'
        "
      >
        <div class="minute absolute px-4">{{ this.currentTime }}'</div>

        <!-- <Placeholder class="h-48" /> -->
        <div class="eventTitle">Red Card</div>
        <div class="eventInfo">
          <div class="playerInfo">
            <div class="playerName">Jude Bellingham</div>
            <div class="teamName">
              {{
                this.typeOfEvent[this.playMinutes.indexOf(this.currentTime - 1)]
                  .for
              }}
            </div>
          </div>
          <img src="../assets/red-card.svg" style="width: 80px" alt="" />
        </div>
        <UButton
          size="md"
          color="indigo"
          square
          label="Continue"
          variant="soft"
          class="w-4/5 justify-center"
          @click="this.action = false"
        />
      </div>
    </UModal>
    <UModal v-model="matchFinishModal">
      <div class="innerContainer nuxtModal p-10 gap-4 relative flex flex-col">
        <div class="whistle flex items-center justify-center gap-4">
          <img src="../assets/whistle.svg" class="whistleImage" alt="" />
          <div class="whistleText text-center">Final whistle</div>
          <UButton
            icon="i-heroicons-x-mark"
            size="md"
            color="indigo"
            class="absolute closeButton"
            square
            @click="this.matchFinishModal = false"
            variant="soft"
          />
        </div>
        <div class="matchInfo flex justify-center items-center gap-3">
          <img :src="this.teamsSelected[0].crest" class="clubLogo" alt="" />
          <div class="infoText">
            {{ this.team1Score }} -
            {{ this.team2Score }}
          </div>
          <img :src="this.teamsSelected[1].crest" class="clubLogo" alt="" />
        </div>
      </div>
    </UModal>
  </div>
</template>

<script>
import events from "../utils/events";
import axios from "axios";
import { useUserStore } from "~/store/useUserStore";
import { supabase } from "../src/lib/supabaseClient";

export default {
  name: "timeline",
  props: {
    teamsSelected: Array,
    matchWeek: Number,
    matchNo: Number,
    table: Array,
    setMatch: Function,
  },
  data() {
    return {
      currentTime: 0,
      pause: false,
      action: false,
      matchFinish: false,
      matchFinishModal: false,
      disableButtons: false,
      elo1: 0,
      elo2: 0,
      probability1: 0,
      statistics: {
        numberOfTeam1Reds: 0,

        numberOfTeam2Reds: 0,
        possession1: 0,
        possession2: 0,
      },
      loading: false,
      fixtures: [],
      bookingFactor: 1,
      bookingFactor2: 1,
      team1Score: 0,
      team2Score: 0,
      events: events,
      options: [
        { outcome: null },
        { outcome: null },
        { outcome: null },
        { outcome: null },
        { outcome: null },
        { outcome: null },
      ],
      typeOfEvent: [],
      areasBlocked: [],
      eventsTimeline: [],
      playMinutes: [],
      noOfEvents: 0,
    };
  },
  methods: {
    getNumberOfChances() {
      let minChances = 8;
      let maxChances = 12;
      this.noOfEvents = Math.floor(
        Math.random() * (maxChances - minChances + 1) + minChances
      );
    },
    getPlayMinutes() {
      const startTime = 1;
      const endTime = 90;
      for (let i = 0; i < this.noOfEvents; i++) {
        let interrupt = Math.floor(
          Math.random() * (endTime - startTime + 1) + startTime
        );
        if (!this.playMinutes.includes(interrupt)) {
          this.playMinutes.push(interrupt);
        } else {
          // If the value already exists, decrement i to try again
          i--;
        }
        this.playMinutes = this.playMinutes.sort((a, b) => a - b);
      }
    },
    handleAction(area, index) {
      console.log("user chose: " + area);
      this.areasBlocked = [];
      this.disableButtons = true;
      for (let i = 0; i < 4; i++) {
        let areaBlocked = Math.floor(Math.random() * 6) + 1;
        if (!this.areasBlocked.includes(areaBlocked)) {
          this.areasBlocked.push(areaBlocked);
        } else {
          // If the value already exists, decrement i to try again
          i--;
        }

        console.log("areaBlocked: " + areaBlocked);
        // if(this.areaBlocked[i] == area){
        //   this.chance
        // }
      }
      let outcome = "";
      if (this.typeOfEvent[index].event == "chance") {
        if (this.areasBlocked.includes(area)) {
          outcome = "missed";
          this.handleTimeline(outcome);
          this.options[area - 1].outcome = false;
          // this.typeOfEvent[index].outcome.push(outcome);
        } else {
          outcome = "goal";
          this.options[area - 1].outcome = true;

          this.handleTimeline(outcome);

          // this.typeOfEvent[index].outcome.push(outcome);
        }
      }

      console.log("indexOfAction: " + index);
      window.setTimeout(() => {
        this.action = false;
        this.disableButtons = false;
        this.resetOptions();
      }, 3000);
      // this.action = false;
    },
    playMatch() {
      this.currentTime = 0;
      window.setInterval(() => {
        if (!this.pause && !this.action && !this.matchFinish) {
          if (this.currentTime <= 90) {
            for (let i = 0; i < this.playMinutes.length; i++) {
              if (this.currentTime == this.playMinutes[i]) {
                this.action = true;
                if (this.typeOfEvent[i].event != "chance")
                  this.handleTimeline(i, i);

                console.log("stop the timer at :" + this.currentTime);
                this.areasBlocked = [];
              }
            }

            let elo1 = this.teamsSelected[0].ELO;
            let elo2 = this.teamsSelected[1].ELO;
            const range = 100;
            const diff = Math.abs(elo1 - elo2);
            const adjustmentFactor = 1.3; // You can tweak this value

            const homeAdvantage = 0.02; // Advantage for the home team

            let prob =
              0.5 +
              homeAdvantage +
              (elo1 > elo2 ? 1 : -1) * (diff / range) * adjustmentFactor;

            let random = Math.random();
            if (random <= prob) {
              this.statistics.possession1 += 1;
            } else {
              this.statistics.possession2 += 1;
            }
            this.getMatchStatistics();

            this.currentTime += 1;
          } else {
            this.matchFinish = true;
            this.matchFinishModal = true;
            // window.setTimeout(() => {
            //   this.matchFinishModal = false;
            // }, 5000);
          }
        }
      }, 500);
    },
    resetOptions() {
      for (let i = 0; i < 6; i++) {
        this.options[i].outcome = null;
      }
    },
    handleTimeline(outcome, indexNonAction) {
      let index = indexNonAction
        ? this.playMinutes.indexOf(this.currentTime)
        : this.playMinutes.indexOf(this.currentTime - 1);
      index == -1 ? (index = 0) : (index = index);

      this.typeOfEvent[index].minute ? (index = index) : (index -= 1);
      if (indexNonAction) {
        let obj = {
          minute: this.typeOfEvent[index].minute,
          type: this.typeOfEvent[index].event,
          for: this.typeOfEvent[index].for,
        };
        this.eventsTimeline.push(obj);
      } else {
        let obj = {
          minute: this.typeOfEvent[index].minute,
          type: this.typeOfEvent[index].event,
          for: this.typeOfEvent[index].for,
          outcome: outcome,
        };
        this.eventsTimeline.push(obj);
        if (outcome == "goal" && obj.for == this.teamsSelected[0].name) {
          this.team1Score += 1;
          this.$emit("changeTeam1Score", this.team1Score);
        } else if (outcome == "goal" && obj.for == this.teamsSelected[1].name) {
          this.team2Score += 1;
          this.$emit("changeTeam2Score", this.team2Score);
        }
      }
      this.getMatchStatistics();

      this.scrollToTop();
    },
    scrollToTop() {
      console.log("*******");
      const element = document.getElementById("content");
      element.scrollIntoView({ behavior: "smooth" });
      element.scroll({
        top: 100,

        behavior: "smooth",
      });
    },
    async getLeagueFixtures() {
      const userStore = useUserStore();

      const { data, error } = await supabase
        .from("fixtures")
        .select("fixtures")
        .eq("username", userStore.user.user_metadata.username);

      if (data) {
        this.fixtures = data[0].fixtures;
        console.log("data", data);
      }
    },
    async updateUserLeagueFixtures(outcome) {
      const userStore = useUserStore();

      this.fixtures[this.matchWeek - 1][this.matchNo].outcome = outcome;
      console.log(
        "currentFixture outcome",
        this.fixtures[this.matchWeek - 1][this.matchNo]
      );
      const { data, error } = await supabase
        .from("fixtures")
        .update({ fixtures: this.fixtures })
        .eq("username", userStore.user.user_metadata.username)
        .select("");
    },
    handleMatchStatus() {
      if (!this.matchFinish) {
        this.pause = !this.pause;
      } else {
        let outcome = {
          team1Score: this.team1Score,
          team2Score: this.team2Score,
          winner:
            this.team1Score == this.team2Score
              ? null
              : this.team1Score > this.team2Score
              ? this.teamsSelected[0].name
              : this.teamsSelected[1].name,
        };
        console.log("outcome", outcome);
        this.updateFixtureOutcome(
          this.teamsSelected[0],
          this.teamsSelected[1],
          outcome
        );
        this.loading = true;
        this.getLeagueFixtures().then(() => {
          this.updateUserLeagueFixtures(outcome).then(() => {
            // this.updateHistoryStadings().then(()=>{

            this.updateLeagueStandings().then(() => {
              // location.reload();
              this.setMatch().then(() => {
                this.loading = false;
              });
            });
            // });
          });
        });
      }
    },
    async updateHistoryStadings() {
      const userStore = useUserStore();
      const { data, error } = await supabase
        .from("standings")
        .update({ positionHistory: this.table })
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
    getMatchEvents() {
      for (let i = 0; i < this.playMinutes.length; i++) {
        let obj = {
          minute: "",
          event: "",
          probability: "",
          for: "",
        };
        // let index = Math.floor(Math.random() * 3);
        let prob = Math.random();
        let index = null;

        prob <= this.events[2].probability
          ? (index = 2)
          : prob <= this.events[1].probability
          ? (index = 1)
          : (index = 0);

        console.log("elo: " + this.elo1, this.elo2);
        obj.event = this.events[index].type;
        obj.probability = this.events[index].probability;
        obj.minute = this.playMinutes[i];
        obj.for = this.chanceFor(this.elo1, this.elo2, index);
        this.typeOfEvent.push(obj);
        let type = this.playMinutes.indexOf(this.currentTime);
      }
    },
    chanceFor(elo1, elo2, index) {
      // Calculate the range and probabilities
      // console.log("******: " + elo1, elo2);

      const range = 100;
      const diff = Math.abs(elo1 - elo2);
      const adjustmentFactor = 2; // You can tweak this value
      const adjustmentFactor2 = 1; // You can tweak this value
      const homeAdvantage = 0.02; // Advantage for the home team
      this.probability1 = null;
      if (index == 0) {
        this.probability1 =
          0.5 +
          homeAdvantage +
          (elo1 > elo2 ? 1 : -1) * (diff / range) * adjustmentFactor;
        console.log("probablility for chance: " + this.probability1);
      } else if (index != 0) {
        this.probability1 =
          0.5 -
          homeAdvantage +
          (elo1 > elo2 ? -1 : 1) * (diff / range) * adjustmentFactor2;
        console.log("probablility for booking: " + this.probability1);
      }
      // let probability2 = 1 - this.probability1;

      // Generate a random number between 0 and 1
      const random = Math.random();
      console.log("random: " + random);
      // adjusting probability in the event of a red card
      this.probability1 *= this.bookingFactor;
      // probability2 *= this.bookingFactor2;
      console.log("probablility for chance222: " + this.probability1);

      // Check which number to pick based on probabilities
      if (random < this.probability1) {
        if (index == 2) {
          this.statistics.numberOfTeam1Reds += 1;
          this.bookingFactor *= Math.pow(
            0.8,
            this.statistics.numberOfTeam1Reds
          );
          this.bookingFactor2 *= Math.pow(
            1.2,
            this.statistics.numberOfTeam1Reds
          );
        }
        return this.teamsSelected[0].name;
      } else {
        if (index == 2) {
          this.statistics.numberOfTeam2Reds += 1;
          this.bookingFactor2 *= Math.pow(
            0.8,
            this.statistics.numberOfTeam2Reds
          );
          this.bookingFactor *= Math.pow(
            1.2,
            this.statistics.numberOfTeam2Reds
          );
        }
        return this.teamsSelected[1].name;
      }
    },
    getMatchStatistics() {
      let attemptsTeam1 = 0;
      let attemptsTeam2 = 0;
      let yellowCards1 = 0;
      let yellowCards2 = 0;
      let redCards1 = 0;
      let redCards2 = 0;

      for (let i = 0; i < this.eventsTimeline.length; i++) {
        if (this.eventsTimeline[i].for == this.teamsSelected[0].name) {
          if (this.eventsTimeline[i].type == "chance") {
            attemptsTeam1++;
          } else if (this.eventsTimeline[i].type == "yellowCard") {
            yellowCards1++;
          } else if (this.eventsTimeline[i].type == "redCard") {
            redCards1++;
          }
        } else {
          if (this.eventsTimeline[i].type == "chance") {
            attemptsTeam2++;
          } else if (this.eventsTimeline[i].type == "yellowCard") {
            yellowCards2++;
          } else if (this.eventsTimeline[i].type == "redCard") {
            redCards2++;
          }
        }
      }

      let statistics = {
        team1: {
          possession: this.statistics.possession1,
          totalAttempts: attemptsTeam1,
          conversionRate:
            attemptsTeam1 != 0 ? (this.team1Score / attemptsTeam1) * 100 : 0,
          redCards: redCards1,
          yellowCards: yellowCards1,
        },
        team2: {
          possession: this.statistics.possession2,
          totalAttempts: attemptsTeam2,
          conversionRate:
            attemptsTeam2 != 0 ? (this.team2Score / attemptsTeam2) * 100 : 0,
          redCards: redCards2,
          yellowCards: yellowCards2,
        },
      };
      this.$emit("getMatchStatistics", statistics);
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
  mounted() {
    this.getNumberOfChances();
    this.getPlayMinutes();
    window.setTimeout(() => {
      this.getMatchEvents();
    }, 560);

    this.getMatchStatistics();
    this.playMatch();
    // this.getLeagueFixtures().then(() => {
    //   // console.log("this.matchWeek", this.matchWeek);
    //   let currentFixture = this.fixtures[this.matchWeek - 1][this.matchNo];
    //   console.log("currentFixture", currentFixture);
    // });

    // this.getTeams();
  },
  beforeUpdate() {
    // console.log("this.teamsSelected[0].ELO :" + this.teamsSelected[0].ELO);
    this.elo1 = this.teamsSelected[0].ELO;
    this.elo2 = this.teamsSelected[1].ELO;
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");
</style>

<style scoped>
.header {
  color: #c0c1d6;
  font-family: Poppins;
  font-size: 36px;
  /* font-style: italic; */
  font-weight: 700;
  line-height: normal;
}

.time {
  color: #c0c1d6;
  font-family: Poppins;
  font-size: 48px;
  /* font-style: italic; */
  font-weight: 700;
  line-height: normal;
}
.timeline {
  min-height: 380px;
  /* justify-content: space-between; */
  /* margin-top: 50px; */

  background: rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  /* overflow-y: scroll; */
}
.divider {
  /* position: absolute;
  height: 83%;
  top: 18%; */
  /* position: absolute; */
  height: 100%;
  left: 0;
  /* top: 18%; */
  right: 0;
}
.closeButton {
  top: 10px;
  right: 10px;
}
.info span {
  color: #c0c1d6;
  font-family: Poppins;
  font-size: 14px;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
}
.outsideContainer {
  /* max-height: 360px;

  overflow-y: scroll; */
  width: 100%;
}

.event {
  animation: fadeIn 0.5s;
}
.clubLogo {
  animation: fadeIn 3s ease-in-out;
}
.bounce {
  animation: bounce 1.5s ease-in-out 5;
}
.whistleImage {
  animation: shake 0.5s ease-in-out 2;
}
@keyframes shake {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-15deg);
  }
  /* 50% {
    transform: rotate(0deg);
  } */
  75% {
    transform: rotate(15deg);
  }
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(0px);
  }
  75% {
    transform: translateY(-3px);
  }
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
.rightSide {
  margin-left: 340px;
  max-width: 250px;
}
.leftSide {
  margin-right: 340px;
  max-width: 250px;
}
/* @media screen and (max-width: 1440px) {
  .event {
    left: -20px;
  }
} */
.playerGoal {
  border-radius: 10px;
  background: #c0c1d6;
  color: #3c3c3c;
  font-family: Poppins;
  font-size: 17px;
  padding: 5px 10px;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
}
.shotMissed {
  background: red !important;
}
.shotGoal {
  background: green !important;
}
.playerYellow {
  border-radius: 10px;
  /* border: 1px solid #c0c1d6; */
  background: #474713;
  color: #c0c1d6;
  font-family: Poppins;
  font-size: 17px;
  padding: 5px 10px;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
}
.playerRed {
  border-radius: 10px;
  /* border: 1px solid #c0c1d6; */
  background: #622929;
  color: #c0c1d6;
  font-family: Poppins;
  font-size: 17px;
  padding: 5px 10px;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
}
.playerNoGoal {
  border-radius: 10px;
  border: 1px solid #c0c1d6;
  color: #c0c1d6;
  font-family: Poppins;
  font-size: 17px;
  padding: 5px 10px;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
}
.goal {
  width: 80%;
  min-height: 150px;
}
.eventTitle {
  color: #c0c1d6;
  font-family: Poppins;
  font-size: 40px;
  /* font-style: italic; */
  text-transform: uppercase;
  font-weight: 600;
  line-height: normal;
}
.eventInfo {
  display: flex;
  column-gap: 20px;
}
.playerInfo {
  display: flex;
  flex-direction: column;
  /* row-gap: 5px; */
}
.whistle img {
  width: 82px;
}
.matchInfo img {
  width: 128px;
  height: 128px;
}
.infoText {
  color: #c0c1d6;
  font-family: Poppins;
  font-size: 64px;
  /* font-style: italic; */
  font-weight: 600;
  line-height: normal;
}
.whistleText {
  color: #c0c1d6;
  text-transform: uppercase;
  font-family: Poppins;
  font-size: 40px;
  font-style: italic;
  font-weight: 600;
  line-height: normal;
}
.playerName {
  color: #c0c1d6;
  font-family: Poppins;
  font-size: 28px;
  font-style: italic;
  font-weight: 600;
  line-height: normal;
  padding: 3px;
  border-bottom: 2px solid #c0c1d6;
}
.teamName {
  color: rgba(192, 193, 214, 0.28);
  font-family: Poppins;
  font-size: 28px;
  font-style: italic;
  font-weight: 600;
  line-height: normal;
}

.minute {
  color: #c0c1d6;
  font-family: Poppins;
  font-size: 48px;
  /* font-style: italic; */
  left: 0;
  top: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: 10px;
  background-color: #424759;
  border-bottom-right-radius: 20px;
  font-weight: 600;
  line-height: normal;
}
</style>
<style>
.divider .border-solid {
  border-color: #3c3c3c !important;
  border-width: 1px;
}
</style>
