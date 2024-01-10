<template>
  <div class="logoContainer">
    <Loading v-if="loading" />

    <div class="links w-1/3">
      <UPopover :popper="{ placement: 'bottom-start', resize: true }">
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
    </div>
    <img class="logo" src="footzone.png" />

    <div class="userInfo flex gap-4 w-1/3 justify-end items-center">
      <div class="coinBalance flex items-center gap-2 my-2">
        <img src="../assets/coins.svg" style="width: 26px" alt="" />
        {{ useUserStore().coinBalance.toLocaleString("en-US") }}
      </div>
      <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
      >
        <template #account>
          <div class="text-left opacity-100" style="height: max-content">
            <p>Signed in as</p>
            <div class="userInfo flex flex-col">
              <p class="userEmail">
                {{ useUserStore().user.email }}
              </p>
              <p class="username">
                {{ username }}
              </p>
            </div>
          </div>
        </template>

        <UButton color="white" trailing-icon="i-heroicons-user-circle" />
      </UDropdown>
    </div>
  </div>
</template>

<script setup>
const links = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Squad",
    to: "/squad",
  },
  {
    label: "Matches",
    to: "/match",
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
import { supabase } from "../src/lib/supabaseClient";
import { useUserStore } from "~/store/useUserStore";

export default {
  data() {
    return {
      routeName: "",
      loading: false,

      // user: {},
      // coinBalance: 0,
      username: "",
      items: [
        [
          {
            label: "",

            slot: "account",

            disabled: true,
          },
        ],

        [
          {
            label: "Logout",
            icon: "i-heroicons-arrow-left-on-rectangle",

            shortcuts: ["L"],
            click: () => {
              this.handleLogout();
            },
          },
        ],
      ],
    };
  },

  async mounted() {
    const toast = useToast();
    const { data, error } = await supabase.auth.getSession();
    if (!data.session) {
      toast.add({
        id: "invalid_access",
        title: "You need to be logged in for access",
        timeout: 5000,
      });
      this.$router.push({ path: "/signup" });
    }

    this.routeName = this.$route.name;
    this.getUserData().then(() => {
      this.getUserBalance();
    });
  },
  methods: {
    async getUserData() {
      this.loading = true;
      const userStore = useUserStore();

      const {
        data: { user },
      } = await supabase.auth.getUser();
      this.loading = false;

      userStore.updateUser(user);

      this.username = userStore.user.user_metadata.username;
    },
    async getUserBalance() {
      const userStore = useUserStore();

      const { data } = await supabase
        .from("users")
        .select("coinBalance")
        .eq("username", userStore.user.user_metadata.username);
      userStore.updateUserBalance(data[0].coinBalance);

      // console.log("data", data);
      // this.coinBalance = data[0].coinBalance;
    },
    async handleLogout() {
      const toast = useToast();

      const { error } = await supabase.auth.signOut();

      toast.add({
        id: "successfull_logout",
        title: "Successfully logged out",
        timeout: 5000,
      });
      this.$router.push({ path: "/login" });
    },
  },
  async beforeMounted() {},
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
.userEmail {
  font-size: 12px;
}
.username {
  font-family: Poppins;
  color: aliceblue;
  opacity: 1;
  font-size: 16px;
  font-weight: 700;
}
</style>
