import { createStore } from "vuex";

export const store = createStore({
  state: {
    sounds: [],
    bgm: "",
    guiEvents: [],
    guiEventOrderedId: 30000,
  },
  getters: {},
  mutations: {
    playBgm(state, bgmKey) {
      state.bgm = bgmKey;
    },
    playSound(state, payload) {
      state.sounds.push(payload);
    },
    flushSounds(state) {
      state.sounds = [];
    },
    guiEvent(state, payload) {
      payload.orderedId = state.guiEventOrderedId++;
      state.guiEvents.push(payload);
    },
  },
});
export default store;
