<template lang="pug">
  .dialog(@click="reset")
    .content(v-if="model.isWin")
      | WIN
    .content(v-if="!model.isWin")
      | LOSE
</template>

<script lang="typescript">
  import Vue from 'vue';
  import store from "./packs/store";
  import Model from "./packs/model";

  export default Vue.extend({
    store,
    props: {
      model: Model,
    },
    methods: {
      reset(){
        this.$store.commit('guiEvent', {subject: 'reset'});
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
