<template lang="pug">
  .game_end(v-if="isStaleMate" @click="endGame" :class="{sending: sending}")
    .stalemate
      | 手詰まり！クリックでメイン画面に戻ります

</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from './packs/model';

  export default Vue.extend({
    props: {
      model: Model,
    },
    data(){
      return {
        sending: false,
      }
    },
    computed: {
      isStaleMate(){
        return this.model?.isStaleMate();
      }
    },
    methods: {
      endGame(){
        if(this.sending){
          return;
        }
        this.sending = true;
        this.$emit("guiEvent", {type: "endGame"});
      }
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .game_end{
    background-color: $ingame-background;
    border: 1px solid $white;
    width: 500px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.sending{
      opacity: 0.5;
    }
  }
</style>
