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
  background: #2b2929;
}
::-webkit-scrollbar-track {
  background: #2b2929;
  width: 2px;
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
</style>
