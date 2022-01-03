<template lang="pug">
  .support-character(v-if="gameStarted")
    .character_animation
       .character_action(:key="currentMessage.face")
        img.character.with_drop_shadow(:src="`/images/square/characters/${model.character.id}-${currentMessage.face}.png`")
    draggable#support-character.hit_box(:group="'top'")

</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from "./packs/model";
  import draggable from "vuedraggable";

  export default Vue.extend({
    props: {
      model: Model,
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
    },
    computed: {
      currentMessage(){
        return this.model.messageManager.currentMessage;
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
        animation: piko 0.2s;
      }
    }
    .character{
      height: 100%;
      transform: scale(-1, 1);
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
        transform: translateY(0);
      }
      50% {
        transform: translateY(-8px);
      }
      100% {
        transform: translateY(0);
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
