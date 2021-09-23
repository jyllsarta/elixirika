<template lang="pug">
  .main_menu
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
        this.$emit("loadScene", {sceneName: "inGame", params: {characterId: characterId, chapterId: -1}});
      }
    },
    mounted(){
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .main_menu{
    width: 100%;
    height: 100%;
    color: $white;
    border: 1px solid $light-green;
  }
</style>
