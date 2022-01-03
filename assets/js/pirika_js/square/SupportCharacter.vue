<template lang="pug">
  .support-character(v-if="character && gameStarted" @click="interact")
    draggable#support-character.hit_box
    .character_animation
       .character_action(:key="actionTime")
        img.character.with_drop_shadow(:src="`/images/square/characters/${character.imageName}.png`")

</template>

<script lang="typescript">
  import Vue from 'vue';
  import draggable from "vuedraggable";

  export default Vue.extend({
    props: {
      character: Object,
      gameStarted: Boolean,
    },
    data(){
      return {
        actionTime: 0,
      }
    },
    components: {
      draggable,
    },
    methods: {
      interact(){
        this.actionTime++;
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .support-character{
    height: 100%;
    position: relative;
    animation: appear 1s;
    .hit_box{
      position: absolute;
      right: 100px;
      height: 100%;
      width: 200px;
    }
    .character_animation{
      pointer-events: none;
      position: absolute;
      right: 0;
      height: 100%;
      animation: yurayura 10s infinite;
      .character_action{
        height: 100%;
        animation: piko 0.5s;
      }
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

    @keyframes piko {
      0% {
      }
      10% {
        transform: translateY(0);
      }
      20% {
        transform: translateY(-8px);
      }
      30% {
        transform: translateY(0);
      }
      60% {
        transform: translateY(0);
      }
      70% {
        transform: translateY(-8px);
      }
      80% {
        transform: translateY(0);
      }
      100% {
      }
    }

    @keyframes appear {
      0% {
        opacity: 0;
        transform: translate(-200px, 100px);
      }
      50%{
        opacity: 0;
      }
      70%{
        opacity: 1;
      }
      100% {
        transform: none;
      }
    }
  }
</style>
