import { createStore } from "vuex";

export const store = createStore({
  state: {
    sounds: [],
    bgm: "",
    showsKeyboardHelp: false,
    showsPlayGuide: false,
    showsMessage: false,
    playGuideCharacterId: -1,
    bgColor: "#18181a",
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
    showKeyboardHelp(state) {
      state.showsKeyboardHelp = true;
    },
    closeKeyboardHelp(state) {
      state.showsKeyboardHelp = false;
    },
    showPlayGuide(state, characterId) {
      state.showsPlayGuide = true;
      state.playGuideCharacterId = characterId;
    },
    closePlayGuide(state) {
      state.showsPlayGuide = false;
    },
    showMessage(state) {
      state.showsMessage = true;
    },
    closeMessage(state) {
      state.showsMessage = false;
    },
    updateBg(state, characterId) {
      const bgColors = {
        1: "#131d1b",
        2: "#201c1e",
        3: "#161e29",
        4: "#1d1620",
        0: "#18181a",
      };
      state.bgColor = bgColors[characterId];
    },
  },
});
export default store;
