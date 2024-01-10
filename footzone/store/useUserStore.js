// ~/store/index.ts
import { defineStore } from "pinia";

export const useUserStore = defineStore("main", {
  state: () => ({
    user: null,
    coinBalance: 0,
  }),
  actions: {
    updateUser(user) {
      this.user = user;
    },
    updateUserBalance(coinBalance) {
      this.coinBalance = coinBalance;
    },
  },
});
