<template lang="pug">
  .game_start(@click="startGame")
    .background
    .front
      .content
        .text
          | がーむはじまり
      .close
        | 任意の箇所をクリックすると閉じます
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from './packs/model';

  export default Vue.extend({
    props: {
      model: Model,
    },
    computed: {
    },
    methods: {
      startGame(){
        this.$emit("startGame");
      }
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .game_start{
    position: absolute;
    width: 100%;
    height: 100%;
    .background{
      position: absolute;
      background-color: $frame-background;
      width: 100%;
      height: 100%;
      opacity: 0.9;
    }
    .background{
      position: absolute;
      background-color: $frame-background;
      width: 100%;
      height: 100%;
      opacity: 0.9;
    }
    .front{
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: $space-ll * 3;
      flex-direction: column;
      .content{
        width: 80%;
        height: 300px;
        border-top: 2px solid $white;
        border-bottom: 2px solid $white;
      }
      .close{
        width: 50%;
        text-align: center;
      }
    }
  }
</style>
