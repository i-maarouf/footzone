<template>
  <div class="mainContainer flex flex-col py-0 items-center justify-center">
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
          :icon="pause ? 'i-heroicons-play' : 'i-heroicons-pause'"
          size="sm"
          color="primary"
          square
          variant="solid"
          @click="this.pause = !this.pause"
        />
      </div>
    </div>
    <div
      class="container timeline py-2 flex items-end justify-center"
      id="content"
    >
      <div class="outsideContainer flex flex-col-reverse gap-4 items-center">
        <div
          class="event flex flex-col gap-1"
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
        class="p-4 flex items-center gap-4 flex-col"
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
            <div class="teamName">Real Madrid</div>
          </div>
          <img src="../assets/football.svg" style="width: 80px" alt="" />
          <div class="minute absolute px-4">{{ this.currentTime }}'</div>
        </div>
        <div class="goal border-t-8 border-x-8 border-sky-100 rounded-t-xl">
          <!-- <div class="w-full"> -->
          <UButton
            size="xl"
            color="indigo"
            square
            :ui="{ rounded: 'rounded-none' }"
            class="p-10 w-1/3 h-full inline-block"
            variant="outline"
            @click="
              handleAction(1, this.playMinutes.indexOf(this.currentTime - 1))
            "
          />
          <UButton
            size="xl"
            color="indigo"
            :ui="{ rounded: 'rounded-none' }"
            square
            class="p-10 w-1/3 h-full inline-block"
            variant="outline"
            @click="
              handleAction(2, this.playMinutes.indexOf(this.currentTime - 1))
            "
          />

          <UButton
            size="xl"
            color="indigo"
            :ui="{ rounded: 'rounded-none' }"
            square
            class="p-10 w-1/3 h-full inline-block"
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
            class="p-10 w-1/3 h-full inline-block"
            variant="outline"
            @click="
              handleAction(4, this.playMinutes.indexOf(this.currentTime - 1))
            "
          />
          <UButton
            size="xl"
            color="indigo"
            :ui="{ rounded: 'rounded-none' }"
            square
            class="p-10 w-1/3 h-full inline-block"
            variant="outline"
            @click="
              handleAction(5, this.playMinutes.indexOf(this.currentTime - 1))
            "
          />
          <UButton
            size="xl"
            color="indigo"
            :ui="{ rounded: 'rounded-none' }"
            square
            class="p-10 w-1/3 h-full inline-block"
            variant="outline"
            @click="
              handleAction(6, this.playMinutes.indexOf(this.currentTime - 1))
            "
          />
          <!-- </div> -->
        </div>
      </div>
      <div
        class="p-4 flex items-center gap-7 flex-col"
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
            <div class="teamName">Real Madrid</div>
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
        class="p-4 flex items-center gap-7 flex-col"
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
            <div class="teamName">Real Madrid</div>
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
  </div>
</template>

<script>
import events from "../utils/events";
import axios from "axios";

export default {
  name: "timeline",

  data() {
    return {
      currentTime: 0,
      pause: false,
      action: false,
      events: events,
      typeOfEvent: [],
      areasBlocked: [],
      eventsTimeline: [],
      playMinutes: [],
      noOfEvents: 0,
    };
  },
  methods: {
    getNumberOfChances() {
      let minChances = 5;
      let maxChances = 10;
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
      for (let i = 0; i < 4; i++) {
        let areaBlocked = Math.floor(Math.random() * 7);
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
          // this.typeOfEvent[index].outcome.push(outcome);
        } else {
          outcome = "goal";
          this.handleTimeline(outcome);

          // this.typeOfEvent[index].outcome.push(outcome);
        }
      }

      console.log("indexOfAction: " + index);
      window.setTimeout((this.action = false), 3000);
      // this.action = false;
    },
    playMatch() {
      this.currentTime = 0;
      window.setInterval(() => {
        if (!this.pause && !this.action) {
          if (this.currentTime <= 90) {
            for (let i = 0; i < this.playMinutes.length; i++) {
              if (this.currentTime == this.playMinutes[i]) {
                this.action = true;
                if (this.typeOfEvent[i].event != "chance")
                  this.handleTimeline(i, i);

                console.log("stop the timer at :" + this.currentTime);
              }
            }
            this.currentTime += 1;
          }
        }
      }, 500);
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
        };
        this.eventsTimeline.push(obj);
      } else {
        let obj = {
          minute: this.typeOfEvent[index].minute,
          type: this.typeOfEvent[index].event,
          outcome: outcome,
        };
        this.eventsTimeline.push(obj);
      }

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
    getMatchEvents() {
      for (let i = 0; i < this.playMinutes.length; i++) {
        let obj = {
          minute: "",
          event: "",
          probability: "",
        };
        // let index = Math.floor(Math.random() * 3);
        let prob = Math.random();
        let index = null;

        prob <= this.events[2].probability
          ? (index = 2)
          : prob <= this.events[1].probability
          ? (index = 1)
          : (index = 0);

        obj.event = this.events[index].type;
        obj.probability = this.events[index].probability;
        obj.minute = this.playMinutes[i];

        this.typeOfEvent.push(obj);
        let type = this.playMinutes.indexOf(this.currentTime);
      }
    },
  },
  mounted() {
    this.getNumberOfChances();
    this.getPlayMinutes();
    this.getMatchEvents();
    this.playMatch();
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
  height: 380px;
  /* justify-content: space-between; */
  /* margin-top: 50px; */
  background: #343232;
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
.info span {
  color: #c0c1d6;
  font-family: Poppins;
  font-size: 14px;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
}
.outsideContainer {
  max-height: 360px;

  overflow-y: scroll;
  width: 100%;
}

.event {
  animation: fadeInOut 0.5s;
}
.bounce {
  animation: bounce 1.5s ease-in-out 5;

  /* animation: name duration timing-function delay iteration-count direction fill-mode; */
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
@keyframes fadeInOut {
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
.event:nth-child(odd) {
  margin-left: 340px;
  max-width: 250px;
}
.event:nth-child(even) {
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
