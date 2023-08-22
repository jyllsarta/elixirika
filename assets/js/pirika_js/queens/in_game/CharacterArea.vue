<template>
  <div class="character_area">
    <character-image-vue class="character_image" :state="state" />
    <enemy-hand-vue class="enemy_hand" :state="state" />
    <baloon-vue class="baloon" :state="state" />
  </div>
</template>

<script>
import store from "../packs/store";
import BaloonVue from './Baloon.vue';
import CharacterImageVue from "./CharacterImage.vue";
import EnemyHandVue from "./EnemyHand.vue";

export default {
  store,
  components: {
    CharacterImageVue,
    EnemyHandVue,
    BaloonVue,
  },
  props: {
    state: Object,
  },
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.character_area{
  position: relative;
  height: 100%;
  width: 100%;
  pointer-events: none;

  .character_image{
    position: absolute;
    width: 55%;
    height: 100%;
    left: 15%;
    z-index: 100;
  }
  .enemy_hand{
    position: absolute;
    left: 10%;
    width: 70%;
    height: 20%;
    bottom: 0;
    z-index: 400;
  }
  .baloon{
    position: absolute;
    width: 30%;
    height: 15%;
    top: 8px;
    right: 25%;
    z-index: 400;
  }
}
</style>
