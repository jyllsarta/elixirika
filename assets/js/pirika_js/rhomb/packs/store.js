import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    sounds: [],
    bgm: "",
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
  },
});
export default store;
