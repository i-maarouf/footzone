<template>
  <div class="mainContainer flex flex-col items-center justify-center">
    <UProgress
      animation="swing"
      size="sm"
      :value="currentTime"
      :max="90"
      steps="0.1"
    />
    <div class="container p-5 grid grid-cols-3">
      <div class="header">Timeline</div>
      <div class="timeline flex relative items-center justify-center flex-col">
        <div class="time">{{ currentTime }}<span class="italic">'</span></div>
        <!-- <div class="events w-full">Jude Bellingham</div> -->

        <div class="event flex absolute flex-col gap-1">
          <div class="info items-center justify-between gap-2 flex">
            <span>GOAL</span>
            <span>21'</span>
          </div>
          <div class="player items-center justify-center gap-2 flex">
            <img
              src="../assets/goal.svg"
              class="animate-[bounce_1.2s_ease-in-out_infinite]"
              style="width: 28px"
              alt=""
            />
            Jude Bellingham
          </div>
        </div>
        <UDivider
          color="gray"
          orientation="vertical"
          class="divider"
          style="min-height: 400px"
          :ui="{ border: { size: { vertical: 'border-t-2' } } }"
        />
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
    <UModal v-model="action" prevent-close>
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
          <div class="minute">{{ this.currentTime }}'</div>
        </div>
        <div class="goal border-t-8 border-x-8 border-sky-100 rounded-t-xl">
          <!-- <div class="w-full"> -->
          <UButton
            size="xl"
            color="indigo"
            square
            :ui="{ rounded: 'rounded-none' }"
            class="p-10 w-1/3 h-full"
            variant="outline"
            @click="this.action = false"
          />
          <UButton
            size="xl"
            color="indigo"
            :ui="{ rounded: 'rounded-none' }"
            square
            class="p-10 w-1/3 h-full"
            variant="outline"
            @click="this.action = false"
          />

          <UButton
            size="xl"
            color="indigo"
            :ui="{ rounded: 'rounded-none' }"
            square
            class="p-10 w-1/3 h-full"
            variant="outline"
            @click="this.action = false"
          />
          <!-- </div> -->
          <!-- <div class="w-full"> -->
          <UButton
            size="xl"
            color="indigo"
            :ui="{ rounded: 'rounded-none' }"
            square
            class="p-10 w-1/3 h-full"
            variant="outline"
            @click="this.action = false"
          />
          <UButton
            size="xl"
            color="indigo"
            :ui="{ rounded: 'rounded-none' }"
            square
            class="p-10 w-1/3 h-full"
            variant="outline"
            @click="this.action = false"
          />
          <UButton
            size="xl"
            color="indigo"
            :ui="{ rounded: 'rounded-none' }"
            square
            class="p-10 w-1/3 h-full"
            variant="outline"
            @click="this.action = false"
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
          <img src="../assets/yellow-card.svg" style="width: 80px" alt="" />
          <div class="playerInfo">
            <div class="playerName">Jude Bellingham</div>
            <div class="teamName">Real Madrid</div>
          </div>
          <div class="minute">{{ this.currentTime }}'</div>
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
        <!-- <Placeholder class="h-48" /> -->
        <div class="eventTitle">Red Card</div>
        <div class="eventInfo">
          <img src="../assets/red-card.svg" style="width: 80px" alt="" />
          <div class="playerInfo">
            <div class="playerName">Jude Bellingham</div>
            <div class="teamName">Real Madrid</div>
          </div>
          <div class="minute">{{ this.currentTime }}'</div>
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
export default {
  name: "timeline",

  data() {
    return {
      currentTime: 0,
      pause: false,
      action: false,
      events: events,
      typeOfEvent: [],
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
    playMatch() {
      this.currentTime = 0;
      window.setInterval(() => {
        if (!this.pause && !this.action) {
          if (this.currentTime <= 90) {
            for (let i = 0; i < this.playMinutes.length; i++) {
              if (this.currentTime == this.playMinutes[i]) {
                this.action = true;

                console.log("stop the timer at :" + this.currentTime);
              }
            }
            this.currentTime += 1;
          }
        }
      }, 500);
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
        console.log("prob: " + prob);
        prob <= this.events[2].probability
          ? (index = 2)
          : prob <= this.events[1].probability
          ? (index = 1)
          : (index = 0);
        console.log("index: " + index);

        obj.event = this.events[index].type;
        obj.probability = this.events[index].probability;
        obj.minute = this.playMinutes[i];

        this.typeOfEvent.push(obj);
        let type = this.playMinutes.indexOf(this.currentTime);
        console.log("type: " + type);
        console.log("currentTime: " + this.currentTime);
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
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");
</style>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap");
</style>
<style scoped>
.header {
  color: #c0c1d6;
  font-family: Inter;
  font-size: 36px;
  /* font-style: italic; */
  font-weight: 700;
  line-height: normal;
}

.time {
  color: #c0c1d6;
  font-family: Inter;
  font-size: 48px;
  /* font-style: italic; */
  font-weight: 700;
  line-height: normal;
}
.divider {
  position: relative;
}
.info span {
  color: #c0c1d6;
  font-family: Inter;
  font-size: 14px;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
}
.event {
  left: 40px;
}
.player {
  border-radius: 10px;
  background: #c0c1d6;
  color: #3c3c3c;
  font-family: Inter;
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
  font-size: 60px;
  font-style: italic;
  text-transform: uppercase;
  font-weight: 600;
  line-height: normal;
}
.eventInfo {
  display: flex;
  column-gap: 10px;
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
  border-bottom: 1px solid #c0c1d6;
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
  font-size: 60px;
  font-style: italic;
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
