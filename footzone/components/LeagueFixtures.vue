<template>
  <div
    class="mainContainer p-5 container mx-auto flex flex-col items-center justify-center"
  >
    <div
      class="flex flex-wrap gap-4 mb-10 justify-between"
      v-if="currentFixture"
    >
      <div class="matchWeek">Match Week {{ page }}</div>
      <div class="matches flex flex-wrap gap-4 justify-between">
        <div
          class="flex"
          v-for="(match, index) in currentFixture"
          :key="match[0]"
        >
          <div class="match">
            <div class="teamsContainer">
              <div
                :class="
                  match.team1.name == teamSelected.name
                    ? 'selectedTeam team1 flex items-center gap-2'
                    : 'team1 flex items-center gap-2'
                "
              >
                <img :src="match.team1.crest" style="width: 32px" alt="" />
                {{ match.team1.name }}
              </div>

              <div
                :class="
                  match.team2.name == teamSelected.name
                    ? 'selectedTeam team2 flex items-center gap-2'
                    : 'team2 flex items-center gap-2'
                "
              >
                <img :src="match.team2.crest" style="width: 32px" alt="" />

                {{ match.team2.name }}
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
                v-if="
                  match.team1.name == teamSelected.name ||
                  match.team2.name == teamSelected.name
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
</template>

<script>
export default {
  props: {
    fixtures: Array,
    teamSelected: Object,
  },
  data() {
    return {
      page: 1,
      pageCount: 1,

      //   pageTotal: this.fixtures.length,
    };
  },
  mounted() {
    this.getTableFixtures();
  },
  methods: {
    async getTableFixtures() {},
    update() {
      console.log("page:", this.page);
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
