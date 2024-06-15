import { defineStore } from "pinia";
export const useMyStore = defineStore("myStore", {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    add() {
      this.count++;
    },
  },
});
