<template>
  <div class="wrapper" v-if="state">
    <img :src="`/images/queens/characters/queens${faceId}.png`" class="character_image">
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
    faceId(){
      return 1;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .character_image{
    padding-top: 60px;
    width: 120%;
    animation: move 7s linear infinite alternate;
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
