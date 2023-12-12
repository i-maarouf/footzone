<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
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
.row,
.column,
.flex {
  flex-wrap: nowrap !important;
}
.q-drawer {
  margin: 20px 10px !important;
}
.bg-primary,
.q-drawer {
  background: #343232 !important;
  margin: 10px;
  border-radius: 10px;
}
/* .q-drawer {
  width: 200px !important;
} */
</style>
