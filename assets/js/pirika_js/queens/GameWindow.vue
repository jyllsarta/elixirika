<template>
  <div class="game_frame">
    <in-game-scene v-if="$store.state.scene.name == 'in_game'"/>
  </div>
</template>

<script>
import InGameScene from './InGameScene.vue';
import store from "./packs/store";

export default {
  store,
  components: {
    InGameScene,
  },
  mounted(){
    this.$store.commit("loadScene", {name: "in_game"});
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.game_frame{
  width: $window-width;
  height: $window-height;
  position: relative;
  background-color: $bg4;
  color: $white;
}
</style>
