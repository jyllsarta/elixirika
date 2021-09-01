<template lang="pug">
  .game_end
    .stalemate(v-if="isStaleMate")
      | 手詰まり！ゲームを終了しようね
    .not_stalemate(v-if="!isStaleMate")
      | まだいける！がんばれ～


</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from './packs/model';

  export default Vue.extend({
    props: {
      model: Model,
    },
    computed: {
      isStaleMate(){
        return this.model?.isStaleMate();
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/constants";
</style>
