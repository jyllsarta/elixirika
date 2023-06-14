import { createStore } from "vuex";

export const store = createStore({
  state: {
    scene: {
      name: "title",
      params: {},
    },
  },
  getters: {},
  mutations: {
    loadScene(state, params) {
      state.scene.name = params.name;
      state.scene.params = params;
    },
  },
});
export default store;
