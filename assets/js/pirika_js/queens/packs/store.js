import { createStore } from "vuex";

export const store = createStore({
  state: {
    scene: {
      name: "title",
      params: {},
    },
    fragments: {
      skill_activation: false,
    }
  },
  getters: {},
  mutations: {
    loadScene(state, params) {
      state.scene.name = params.name;
      state.scene.params = params;
    },
    showFragment(state, params) {
      state.fragments[params.name] = true;
    },
    hideFragment(state, params) {
      state.fragments[params.name] = false;
    }
  },
});
export default store;
