<template>
  <div class="wrapper" v-if="state">
    <div class="offset">
      <img :src="`/images/queens/characters/character${state.quest.character_id}_${faceId}.png`" class="character_image">
    </div>
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store,
  props: {
    state: Object,
  },
  computed: {
    faceId() {
      return this.state.uiState.faceId;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  .offset{
    width: 100%;
    height: 100%;
    transform: translateY(calc((100% - 530px)/3));
    .character_image{
      width: 100%;
      animation: move 7s linear infinite alternate;
    }
  }

  @keyframes move {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(5px);
    }
  }
}
</style>
