<template lang="pug">
  .area.with_shadow
    .title
      |  - 今回の目標 - 
    .score
      | スコア：{{model.currentScore()}}
    .challenges()
      ChallengeText(
        v-for="challenge, index in challenges"
        :is-cleared="isCleared(challenge.id)",
        :index="index",
        :challenge="challenge"
        :key="index"
      )

</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from "./packs/model";
  import ChallengeText from "./ChallengeText.vue";

  export default Vue.extend({
    props: {
      model: Model,
    },
    components: {
      ChallengeText
    },
    computed: {
      challenges(){
        return this.model.challenge.getByChallengeIds(this.model.chapter.challenge_ids);
      }
    },
    methods: {
      isCleared(challengeId){
        return this.model.clearedChallenges.indexOf(challengeId) !== -1;
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 220px;
    height: unquote('max(180px, 36%)');
    background-color: $ingame-background;
    border: 2px solid $yellow3;
    border-radius: $radius;
    padding: $space-m;
    .title{
      font-size: $font-size-medium;
      width: 100%;
      text-align: center;
    }
  }
</style>
