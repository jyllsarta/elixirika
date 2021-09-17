<template lang="pug">
  .title
    LeaderBoard(ref="leaderBoard")
    NameArea(:title-refs="$refs")
    .start(@click="onClick(1)")
      | ピリカではじめる
    .start(@click="onClick(2)")
      | ミズハではじめる

</template>

<script lang="typescript">
  import Vue from 'vue';
  import LeaderBoard from "./LeaderBoard.vue";
  import NameArea from "./NameArea.vue";

export default Vue.extend({
    components: {
      NameArea,
      LeaderBoard,
    },
    methods: {
      onClick(characterId){
        this.$emit("characterSelected", characterId);
      }
    },
    mounted(){
      // しばらく自動的にインゲームシーンから開始させるようにする
      this.$emit("characterSelected", 1);
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
</style>
