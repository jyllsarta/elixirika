<template>
  <div class="character_area">
    <character-image-vue class="character_image" />
    <enemy-hand-vue class="enemy_hand" :state="state"/>
    <baloon-vue class="baloon" />
    <challenge-board-vue class="challenge-board" />
  </div>
</template>

<script>
import store from "../packs/store";
import BaloonVue from './Baloon.vue';
import CharacterImageVue from "./CharacterImage.vue";
import ChallengeBoardVue from "./ChallengeBoard.vue";
import EnemyHandVue from "./EnemyHand.vue";

export default {
  store,
  components: {
    CharacterImageVue,
    EnemyHandVue,
    BaloonVue,
    ChallengeBoardVue
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
    width: 50%;
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
    width: 30%;
    height: 30%;
    top: 30%;
    right: 32%;
    z-index: 400;
  }
  .challenge_board{
    position: absolute;
    width: 30%;
    height: 80%;
    right: 0;
    z-index: 400;
  }
}
</style>
