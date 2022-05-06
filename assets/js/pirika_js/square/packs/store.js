import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    sounds: [],
    bgm: "",
    showsKeyboardHelp: false,
    showsPlayGuide: false,
    playGuideCharacterId: -1,
  },
  getters: {
  },
  mutations: {
    playBgm(state, bgmKey){
      state.bgm = bgmKey;
    },
    playSound(state, payload){
      state.sounds.push(payload);
    },
    flushSounds(state){
      state.sounds = [];
    },
    showKeyboardHelp(state){
      state.showsKeyboardHelp = true;
    },
    closeKeyboardHelp(state){
      state.showsKeyboardHelp = false;
    },
    showPlayGuide(state, characterId){
      state.showsPlayGuide = true;
      state.playGuideCharacterId = characterId;
    },
    closePlayGuide(state){
      state.showsPlayGuide = false;
    },
  },
});
export default store;
