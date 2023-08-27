<template>
  <div class="character_area">
    <character-image-vue class="character_image" :state="state" @click="onCharacterClick"/>
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
    controller: Object,
  },
  methods: {
    onCharacterClick(){
      this.controller.operate("clickCharacter", this.state.uiState.clickCount);
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.character_area{
  position: relative;
  height: 100%;
  width: 100%;

  .character_image{
    position: absolute;
    max-width: 750px;
    width: 75%;
    height: 100%;
    left: 5%;
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
    width: 40%;
    height: 25%;
    top: 8px;
    right: 8px;
    z-index: 400;
  }
}
</style>
