<template lang="pug">
  .area.with_shadow
    .title
      |  - 今回の目標 - 
    .score
      .label
        | スコア：
      .value
        | {{model.currentScore()}}
    .challenges
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
    width: 210px;
    height: unquote('max(180px, 36%)');
    background-color: $ingame-background;
    border: 2px solid $yellow3;
    border-radius: $radius;
    padding: $space-m;
    display: flex;
    flex-direction: column;
    .title{
      font-size: $font-size-medium;
      width: 100%;
      text-align: center;
    }
    .score{
      padding: $space-s;
      display: flex;
      margin-left: 10%;
      width: 80%;
      justify-content: space-between;
      border-bottom: 2px solid $gray3;
    }
    .challenges{
      padding-top: $space-m;
      padding-bottom: $space-m;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
</style>
