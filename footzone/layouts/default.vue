<template>
  <section>
    <!-- <q-header bordered class="bg-primary text-white"> -->
    <div class="logoContainer">
      <UPopover>
        <UButton
          color="white"
          style="text-transform: capitalize"
          :label="routeName"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        />

        <template #panel>
          <UVerticalNavigation :links="links">
            <template #default="{ link }">
              <span class="relative" activeClass="text-primary">{{
                link.label
              }}</span>
            </template>
          </UVerticalNavigation>
        </template>
      </UPopover>

      <img class="logo" src="footzone.png" />

      <!-- Ignore this block of code -->
      <UPopover style="visibility: hidden">
        <UButton
          color="white"
          style="text-transform: capitalize"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        />

        <template #panel>
          <UVerticalNavigation :links="links">
            <template #default="{ link }">
              <span class="relative" activeClass="text-primary">{{
                link.label
              }}</span>
            </template>
          </UVerticalNavigation>
        </template>
      </UPopover>
      <!--  -->
    </div>
    <slot />
  </section>
</template>
<script setup>
const links = [
  {
    label: "Squad",
    to: "/squad",
  },
  {
    label: "Matches",
    to: "/",
  },
  {
    label: "Standings",
    to: "/Standings",
  },
  {
    label: "Packs",
    to: "/packs",
  },
];
</script>
<script>
export default {
  data() {
    return {
      routeName: "",
    };
  },
  mounted() {
    console.log("route: " + this.$route.name);
    this.routeName = this.$route.name;
  },
  beforeUpdate() {
    this.routeName = this.$route.name;
  },
};
</script>
<style scoped>
.logoContainer {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;

  margin: 10px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.25);
  padding: 10px;
}
</style>
