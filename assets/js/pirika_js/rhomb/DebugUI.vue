
<template lang="pug">
  .debug_ui
    .title
      | DEBUG UI
    .item
      | PHASE: {{model.phaseStateMachine.phase}}
    .item
      | isGameStarted: {{model.isGameStarted}}
    .button(@click="$store.commit('guiEvent', {subject: 'nextPhase'})")
      | NEXT PHASE
    .item
      | state: {{$store.state}}
</template>

<script lang="typescript">
  import Vue from 'vue';
  import store from "./packs/store";
  import Model from "./packs/model";

  export default Vue.extend({
    store,
    props: {
      model : Model
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .debug_ui{
    .title{
      line-height: 100%;
      font-size: 8px;
      width: 100%;
      text-align: center;
      color: rgb(229, 255, 188);
    }
    opacity: 0.8;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    .item{
      line-height: 100%;
    }
    .button{
      width: 100px;
      height: 28px;
      text-align: center;
      padding-top: 6px;
      line-height: 100%;
      border: 1px solid rgb(0, 162, 255);
      background-color: rgba(0, 162, 255, 0.2);
    }
  }
</style>
