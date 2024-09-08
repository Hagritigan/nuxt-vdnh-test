import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    members: null,
  }),

  getters: {
    Members(state) {
        return state.members;
    }
  },

  actions: {
    async getMembers() {
        const req = await $fetch('https://run.mocky.io/v3/c8764795-4166-4ae4-8671-d3f6b2c9c142', { method: 'GET'});

        this.members = req;
    }
  }
});