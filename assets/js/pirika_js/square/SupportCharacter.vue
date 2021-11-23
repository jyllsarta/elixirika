<template lang="pug">
  draggable#support-character(v-if="character")
    .character_animation
      img.character(:src="`/images/square/characters/${character.imageName}.png`")

</template>

<script lang="typescript">
  import Vue from 'vue';
  import draggable from "vuedraggable";

  export default Vue.extend({
    props: {
      character: Object,
    },
    components: {
      draggable,
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  #support-character{
    height: 100%;
    position: relative;
    .character_animation{
      position: absolute;
      right: 0;
      height: 100%;
      animation: yurayura 10s infinite;
    }
    .character{
      height: 100%;
      transform: scale(-1, 1);
      pointer-events: none;
    }

    @keyframes yurayura {
      0% {
      }
      25% {
        transform: translateY(-4px) scale(1.003);
      }
      75% {
        transform: translateY(4px) scale(0.998);
      }
      100% {
      }
    }

  }
</style>
