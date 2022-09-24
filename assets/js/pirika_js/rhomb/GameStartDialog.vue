<template lang="pug">
  .dialog(@click="startGame")
    .content
      | ゲームを開始します
</template>

<script lang="typescript">
  import Vue from 'vue';
  import store from "./packs/store";

  export default Vue.extend({
    store,
    methods: {
      startGame(){
        this.$store.commit('guiEvent', {subject: 'nextPhase'})
        this.$store.commit("playSound", {key: "ok"});
        this.$store.commit("playBgm", "bgm3");
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .dialog{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.642);
    .content{
      color: white;
    }
  }
</style>
