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
</style>
