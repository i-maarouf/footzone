<template>
  <div>
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
body {
  background: #111828;
  /* background: conic-gradient(
    from 41deg at 0% 120.9%,
    rgba(17, 24, 40, 0.17) 3.98716002702713deg,
    rgba(14, 60, 76, 0.17) 33.0388069152832deg,
    rgba(0, 240, 255, 0.17) 176.28782272338867deg
  ); */
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
