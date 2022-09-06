
<template lang="pug">
  .scene
    .title(@click="proceed")
      | インゲームです
    .title(@click="backToMenu")
      | メニューに戻るです
    .title(@click="startGame")
      | スタートします
    .value
      | {{model.seed}}
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from "./packs/model";

  export default Vue.extend({
    data(){
      return {
        model: {},
      };
    },
    methods: {
      proceed(){
        this.$emit("loadScene", {sceneName: "title"});
      },
      backToMenu(){
        this.$emit("loadScene", {sceneName: "mainMenu"});
      },
      startGame(){
        this.model = new Model(999);
      }
    },
    mounted(){
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .scene{
    position: relative;
    color: $white;
    width: 100%;
    height: 100%;
    border: 1px solid white;
  }

  .title{
    width: 200px;
    height: 100px;
    background-color: rgb(157, 222, 135);
  }
</style>
