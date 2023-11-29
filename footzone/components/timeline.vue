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
      <div class="timeline flex items-center justify-center flex-col">
        <div class="time">{{ currentTime }} '</div>
        <!-- <div class="events w-full">Jude Bellingham</div> -->
        <UDivider
          color="gray"
          orientation="vertical"
          class="divider"
          style="min-height: 400px"
          :ui="{ border: { size: { vertical: 'border-t-2' } } }"
        >
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
        </UDivider>
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
      <div class="p-4">
        <!-- <Placeholder class="h-48" /> -->
        <UButton
          icon="i-heroicons-pencil-square"
          size="sm"
          color="primary"
          square
          variant="solid"
          @click="this.action = false"
        />
      </div>
    </UModal>
  </div>
</template>

<script>
export default {
  name: "timeline",

  data() {
    return {
      currentTime: 0,
      pause: false,
      action: false,
      playMinutes: [],
      noOfChances: 0,
    };
  },
  methods: {
    getNumberOfChances() {
      let minChances = 5;
      let maxChances = 15;
      this.noOfChances = Math.floor(
        Math.random() * (maxChances - minChances + 1) + minChances
      );
    },
    getPlayMinutes() {
      const startTime = 1;
      const endTime = 90;
      for (let i = 0; i < this.noOfChances; i++) {
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
  },
  mounted() {
    this.getNumberOfChances();
    this.getPlayMinutes();
    this.playMatch();
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");
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
</style>
<style>
.divider .border-solid {
  border-color: #3c3c3c !important;
}
</style>
