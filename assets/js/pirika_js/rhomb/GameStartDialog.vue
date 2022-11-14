<template lang="pug">
  .dialog(@click="tick")
    .content
      | {{messages[model.phaseStateMachine.phase.tick]}}
</template>

<script lang="javascript">
  import Vue from 'vue';
  import store from "./packs/store";
  import Model from "./packs/model";

  export default Vue.extend({
    store,
    props: {
      model: Model,
    },
    data(){
      return {
        messages: [
          "ゲームを開始します",
          "いくぞー！",
        ]
      }
    },
    methods: {
      tick(){
        if(this.model.phaseStateMachine.phase.tick > 0){
          return;
        }
        this.$store.commit('guiEvent', {subject: 'next'})
        this.$store.commit("playSound", {key: "ok"});
        this.$store.commit("playBgm", "bgm1");
        setTimeout(()=>{
          this.$store.commit('guiEvent', {subject: 'next'})
          this.$store.commit("playSound", {key: "game_start"});
        }, 500)
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
