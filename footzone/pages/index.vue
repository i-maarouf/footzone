<template>
  <section>
    <div class="mainContainer p-5 container mx-auto">
      <div class="scoreboard w-full py-2">
        <div class="team1">
          <div class="name text-center">Real Madrid</div>
          <div class="card shadow-lg">
            <div class="score">3</div>
          </div>
        </div>
        <div class="vs">VS</div>
        <div class="team2">
          <div class="name text-center">Barcelona</div>
          <div class="card2 shadow-lg">
            <div class="score">2</div>
          </div>
        </div>
      </div>
    </div>

    <Timeline />
  </section>
</template>

<script>
export default {};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");
</style>

<style scoped>
.mainContainer {
  background: #2b2929;
  /* height: 45vh; */
}
.scoreboard {
  display: flex;
  align-items: center;
  /* border-bottom: 5px solid #3c3c3c; */
  justify-content: space-between;
}
.vs {
  color: rgba(0, 0, 0, 0.43);
  font-family: Poppins;
  font-size: 201px;
  /* font-style: italic; */
  font-weight: 700;
  line-height: normal;
}
.team1,
.team2 {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
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
  background: linear-gradient(315deg, rgba(0, 0, 0, 0) 70.26%, #febe10a3 116.8%),
    linear-gradient(131deg, #fff -2.76%, #00529f76 123.04%);

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
