<template>
  <div>
    <div class="appContainer">
      <!-- <div class="circle1"></div> -->
      <div class="lowerBox"></div>
    </div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>
<script setup>
useHead({
  link: [{ rel: "icon", type: "image/svg", href: "/fz.svg" }],
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");
</style>
<style>
.appContainer {
  /* background: #111828; */
  background: rgb(17, 24, 40);
  /* background: linear-gradient(
    153deg,
    rgba(17, 24, 40, 1) 75%,
    rgba(14, 60, 76, 1) 100%
  ); */

  filter: blur(50px);

  position: fixed;
  width: 100%;
  z-index: -1;
  height: 100vh;
}
/* body {
  background: linear-gradient(
    153deg,
    rgba(17, 24, 40, 1) 75%,
    rgb(55, 39, 235) 100%
  );
} */
.circle1 {
  background: rgba(38, 11, 91, 0.724);

  z-index: -1;

  border-radius: 50%;
  left: -260px;
  bottom: 0;
  /* top: 0; */
  /* margin-top: auto;
  margin-bottom: auto; */
  animation: fireAnimation2 25s ease-in-out 0s infinite normal;
  position: absolute;
}
.lowerBox {
  background: rgb(74, 57, 226);
  width: 50px;
  z-index: -1;
  /* height: 20px; */
  /* border-radius: 50%; */
  /* left: -40px; */
  width: 100%;
  bottom: -20px;
  position: absolute;
  animation: fireAnimation 5s ease-in-out 0s infinite normal;
}
@keyframes fireAnimation {
  0% {
    height: 10px;
  }
  50% {
    height: 20px;
  }
  100% {
    height: 10px;
  }
}
@keyframes fireAnimation2 {
  0% {
    width: 400px;
    height: 400px;
    opacity: 0.5;
    bottom: 0;
    left: -260px;

    transform: scale(1);
  }
  50% {
    opacity: 0.2;
    background: rgba(34, 184, 211, 0.724);
    transform: scale(1.2);
    left: -360px;
    bottom: 200px;
  }
  100% {
    width: 400px;
    bottom: 0;
    left: -260px;
    height: 400px;
    opacity: 0.5;
    transform: scale(1);
  }
}
::-webkit-scrollbar-track {
  background: #111828;
  width: 2px;
}
.nuxtModal {
  background: #111828 !important;
  z-index: 999;
  position: relative;
}
.list-disc {
  display: none;
}
.rounded-e-full {
  border-start-end-radius: 5px !important;
  border-end-end-radius: 5px !important;
}
.rounded-s-full {
  border-start-start-radius: 5px !important;
  border-end-start-radius: 5px !important;
}
.grow.px-4.py-5.sm\:p-6 {
  overflow-y: scroll;
}

.focus-visible\:ring-2:focus-visible {
  box-shadow: none !important;
}
.focus\:outline-none:focus {
  outline: none !important;
}
</style>
