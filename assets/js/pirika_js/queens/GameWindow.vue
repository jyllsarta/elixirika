<template>
  <div class="game_frame">
    <title-scene v-if="$store.state.scene.name === 'title'"/>
    <menu-scene v-if="$store.state.scene.name === 'menu'"/>
    <in-game-scene v-if="$store.state.scene.name === 'in_game'"/>
    <equipment-scene v-if="$store.state.scene.name === 'equipment'"/>
    <shop-scene v-if="$store.state.scene.name === 'shop'"/>
  </div>
</template>

<script>
import TitleScene from './TitleScene.vue';
import MenuScene from './MenuScene.vue';
import InGameScene from './InGameScene.vue';
import EquipmentScene from './EquipmentScene.vue';
import ShopScene from './ShopScene.vue';
import store from "./packs/store";

export default {
  store,
  components: {
    TitleScene,
    MenuScene,
    InGameScene,
    ShopScene,
    EquipmentScene,
  },
  mounted(){
    this.$store.commit("loadScene", {name: "in_game", questId: 201});
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
