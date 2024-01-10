<template>
  <section>{{}}</section>
</template>

<script>
import { useUserStore } from "~/store/useUserStore";

export default {
  name: "standings",
  setup() {
    const userStore = useUserStore();

    // Access the count property like a regular object
    const currentCount = userStore.user;

    return { userStore, currentCount };
  },
  data() {
    return {};
  },
  mounted() {
    // const userStore = useUserStore();
    // window.setTimeout(() => {
    // console.log(userStore.store);
    // }, 2000);
  },
};
</script>

<style></style>
