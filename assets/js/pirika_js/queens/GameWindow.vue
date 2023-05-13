<template>
  <div class="game_frame">
    <title-scene v-if="$store.state.scene.name === 'title'"/>
    <menu-scene v-if="$store.state.scene.name === 'menu'"/>
    <in-game-scene v-if="$store.state.scene.name === 'in_game'"/>
  </div>
</template>

<script>
import TitleScene from './TitleScene.vue';
import MenuScene from './MenuScene.vue';
import InGameScene from './InGameScene.vue';
import store from "./packs/store";

export default {
  store,
  components: {
    TitleScene,
    MenuScene,
    InGameScene,
  },
  mounted(){
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
