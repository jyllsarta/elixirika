import { createStore } from "vuex";

export const store = createStore({
  state: {
    scene: {
      name: "title",
      params: {},
    },
    fragments: {
      skill_activation: false,
    },
    fragments_extra: {
      skill_activation: {
        skillId: 0,
      }
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
      state.fragments_extra[params.name] = params.extra;
    },
    hideFragment(state, params) {
      state.fragments[params.name] = false;
    }
  },
});
export default store;
